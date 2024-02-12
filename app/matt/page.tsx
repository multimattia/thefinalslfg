import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import MattForm from "@/components/MattForm";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <MattForm
        discordName={user?.user_metadata?.full_name}
        session={user?.id || ""}
      />
    </>
  );
}
