'use server'

import { z } from "zod";
import { FilterSchema } from "@/lib/filterschema";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type Inputs = z.infer<typeof FilterSchema>
const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function initialList() {
  return ((await supabase.from("posts").select()))
}

export async function addFilter(data: Inputs) {
    const result = FilterSchema.safeParse(data)
    console.log(data)

    if (result.success) {
        let filters = ''

        for (const property in data) {
            if (data[property] === true){
                const capitalizedProperty = property.charAt(0).toUpperCase() + property.slice(1);
                filters += `rank.eq.${capitalizedProperty},`;
            }
        }
        filters = filters.slice(0, -1); // Remove the trailing comma
        console.log(filters)
        if (filters) {

            return{success: true, data: (await supabase.from("posts").select().or(filters))};
        } else {
            return{success: true, data: (await supabase.from("posts").select())};

        }
    }
    if (result.error) {
        return{success: false, data: result.error.format()};
    }
}