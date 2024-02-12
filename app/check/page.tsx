import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: users } = await supabase.from("users").select();

  return (
    <div className="flex-auto">
      <Button className="">button </Button>
    </div>
  );
}
