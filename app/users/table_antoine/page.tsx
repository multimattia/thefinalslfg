import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import FilterForm from "./FilterForm";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // poll from the cookie on the page what to filter out of the posts
  const { data: users } = await supabase.from("posts").select();
  return (
    <>
      <FilterForm />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  );
}
