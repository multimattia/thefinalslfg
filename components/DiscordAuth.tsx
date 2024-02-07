import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
      if (process?.env?.NEXT_PUBLIC_VERCEL_URL) {
        url = `${process?.env?.NEXT_PUBLIC_VERCEL_URL}/auth/callback`;
      } else if (process?.env?.NEXT_PUBLIC_SITE_URL) {
        url = `${process?.env?.NEXT_PUBLIC_SITE_URL}/auth/callback`;
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

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically Set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url.concat("", "auth/callback");
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
      <p>vercel_url: {process?.env?.NEXT_PUBLIC_VERCEL_URL}</p>
      <p>site_url: {process?.env?.NEXT_PUBLIC_SITE_URL}</p>
      <p>geturl: {getURL()}</p>
    </form>
  );
}
