import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


export default async function Page() {
  // supabase variables

  async function addUser(formData: FormData) {
    "use server"
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const rawFormData = {
      discordName: formData.get('discordName'),
      embarkId: formData.get('embarkId'),
      playerRank: formData.get('playerRank'),
    }
    console.log(rawFormData)

    const { error } = await supabase.from("users").insert({
      discord_name: rawFormData.discordName, embark_id: rawFormData.embarkId, rank: rawFormData.playerRank
      });
      console.log(error);
  }

  return (
    <>
      <form action={addUser} className="flex flex-col">
                <label htmlFor="discordName">Discord name</label>
                <input name="discordName" type="text" className="bg-gray-800"/>

                <label htmlFor="embarkId">Embark ID</label>
                <input name="embarkId" type="text" className="bg-gray-800"/>

                <label htmlFor="playerRank">Player rank</label>
                <input name="playerRank" type="text" className="bg-gray-800"/>

                <button type="submit">add</button>

            </form>
    </>
  );
}
