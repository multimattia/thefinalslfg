import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Page() {
  // function to be called when form is submitted
  async function addUser(formData: FormData) {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const rawFormData = {
      embarkId: formData.get("embarkId"),
      playerRank: formData.get("playerRank"),
    };

    //check if user is logged in
    if (user) {
      // insert form data into supabase and redirect user
      const { error } = await supabase.from("users").insert({
        discord_name: user?.user_metadata?.full_name,
        embark_id: rawFormData.embarkId,
        rank: rawFormData.playerRank,
        user_id: user?.id,
      });
      console.log(error);
      return redirect("/users");
    } else {
      // otherwise just redirect user
      console.log("Must be logged in to add user");
      return redirect("/users");
    }
  }

  return (
    <>
      <form action={addUser} className="inline-flex flex-auto flex-col">
        <label htmlFor="embarkId">Embark ID</label>
        <input name="embarkId" type="text" className="border-2" />

        <label htmlFor="playerRank">Player rank</label>
        <input name="playerRank" type="text" className="mb-4 border-2" />

        <Button type="submit">add</Button>
      </form>
    </>
  );
}
