"use server";

import { z } from "zod";
import { FormDataSchema } from "@/lib/formschema";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Inputs = z.infer<typeof FormDataSchema>;

export async function addListing(data: Inputs) {
  const result = FormDataSchema.safeParse(data);

  if (result.success) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    //check if user is logged in
    if (user) {
      // insert form data into supabase and redirect user
      const { error } = await supabase.from("users").insert({
        discord_name: data.discordUsername,
        embark_id: data.embarkUsername,
        rank: data.rank,
        platforms: data.platform,
        user_id: user?.id,
      });
      console.log(error);
      return redirect("/users");
    } else {
      // otherwise just redirect user
      console.log("Must be logged in to add user");
      return redirect("/users");
    }
    // return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
