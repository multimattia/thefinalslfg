"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { FormDataSchema } from "@/lib/servertypes";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Inputs = z.infer<typeof FormDataSchema>;

export async function addListing(data: Inputs) {
  const result = FormDataSchema.safeParse(data);

  if (result.success === true) {
    console.log("Success!");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    //check if user is logged in
    if (user) {
      // insert form data into supabase and redirect user
      const { error } = await supabase.from("posts").insert({
        discord_name: data.discordUsername,
        embark_id: data.embarkUsername,
        rank: data.rank,
        platforms: data.platform,
        region: data.region,
        class: data.class,
        notes: data.notes,
        user_id: user?.id,
      });
      console.log(error);
      return redirect("/");
    } else {
      // otherwise just redirect user
      console.log("Must be logged in to add user");
      return redirect("/users");
    }
    // return { success: true, data: result.data };
  }

  if (result.error) {
    console.log("error!");
    console.log(result.error.format());
    return { success: false, error: result.error.format() };
  }
}
