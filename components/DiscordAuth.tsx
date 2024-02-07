import { createClient } from "@/utils/supabase/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const authCallbackURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/auth/callback`
  : "http://localhost:3000/auth/callback";

export default async function DiscordAuth() {
  "use server";
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  const signIn = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: authCallbackURL,
      },
    });
    if (error) {
      console.error(error);
    }
    return redirect(data.url!);
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.user_metadata.name}!
      <form action={signOut}>
        <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <form action={signIn}>
      <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
        Sign in with Discord
      </button>
    </form>
  );
}
