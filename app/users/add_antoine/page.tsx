import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";

export default async function Page() {
  // function to be called when form is submitted
  async function addUser(formData: FormData) {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const rawFormData = {
      discordName: formData.get("discordName"),
      embarkId: formData.get("embarkId"),
      playerRank: formData.get("playerRank"),
    };

    // insert form data into supabase
    const { error } = await supabase.from("users").insert({
      discord_name: rawFormData.discordName,
      embark_id: rawFormData.embarkId,
      rank: rawFormData.playerRank,
    });
    console.log(error);
  }

  return (
    <>
      <form action={addUser} className="flex inline-flex flex-auto flex-col">
        <label htmlFor="discordName">Discord name</label>
        <input name="discordName" type="text" className="border-2" />

        <label htmlFor="embarkId">Embark ID</label>
        <input name="embarkId" type="text" className="border-2" />

        <label htmlFor="playerRank">Player rank</label>
        <input name="playerRank" type="text" className="mb-4 border-2" />

        <Button type="submit">add</Button>
      </form>
    </>
  );
}
