import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export default async function Page() {
  "use server";

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // function to be called when form is submitted
  async function addUser(formData: FormData) {
    "use server";

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const rawFormData = {
      embarkId: formData.get("embarkId"),
      playerRank: formData.get("playerRank"),
    };

    // insert form data into supabase
    const { error } = await supabase.from("users").insert({
      discord_name: user?.user_metadata.full_name,
      embark_id: rawFormData.embarkId,
      rank: rawFormData.playerRank,
      user_id: user?.id,
    });
    console.log(error);
    return redirect("/users");
  }

  return user ? (
    <>
      <form action={addUser} className="inline-flex flex-auto flex-col">
        <label htmlFor="embarkId">Embark ID</label>
        <input name="embarkId" type="text" className="border-2" />

        <label htmlFor="playerRank">Player rank</label>
        <input name="playerRank" type="text" className="mb-4 border-2" />

        <Button type="submit">add</Button>
      </form>
    </>
  ) : (
    <>
      <h1>Please sign in through discord to create posts</h1>
    </>
  );
}
