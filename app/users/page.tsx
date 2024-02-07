import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log(supabase);
  const { data: users } = await supabase.from("users").select();
  console.log(users);

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}