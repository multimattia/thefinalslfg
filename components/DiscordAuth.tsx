import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DiscordAuth() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/login");
  };

  const signIn = async () => {
    "use server";

    console.log("Getting cookies...");
    const cookieStore = cookies();
    console.log("creating supabase client...");
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    console.log(data);
    return redirect(data.url!);
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <form action={signIn}>
      <button className="rounded-md bg-btn-background px-4 py-2 no-underline hover:bg-btn-background-hover">
        sign in with discord
      </button>
    </form>
    // <Link
    //   href="/loginWithDiscord"
    //   className="flex rounded-md bg-btn-background px-3 py-2 no-underline hover:bg-btn-background-hover"
    // >
    //   Login
    // </Link>
  );
}
