import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DiscordAuth() {
  "use server";
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
    return redirect("/");
  };

  const signIn = async () => {
    "use server";
    const getURL = () => {
      let url = "";
      if (process?.env?.NEXT_PUBLIC_SITE_URL) {
        url = `${process?.env?.NEXT_PUBLIC_SITE_URL}/auth/callback`;
      } else if (process?.env?.NEXT_PUBLIC_VERCEL_URL) {
        url = `${process?.env?.NEXT_PUBLIC_VERCEL_URL}/auth/callback`;
      } else {
        url = "http://localhost:3000/auth/callback";
      }
      // Make sure to include `https://` when not localhost.
      url = url.includes("http") ? url : `https://${url}`;
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
      return url;
    };

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) {
      console.error(error);
    }
    return redirect(data.url!);
  };

  return user ? (
    <div className="flex items-center gap-4 text-white">
      <form action={signOut}>
        <button className="rounded-md bg-btn-background px-4 py-2 font-sans text-white no-underline hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
      {user.user_metadata.full_name}
      <Image
        className="rounded-full"
        src={user.user_metadata.picture}
        width={35}
        height={35}
        alt="Picture of the current user taken from Discord"
      />
    </div>
  ) : (
    <form action={signIn}>
      <button className="rounded-md bg-btn-background px-4 py-2 font-sans text-white no-underline hover:bg-btn-background-hover">
        Sign in with Discord
      </button>
    </form>
  );
}
