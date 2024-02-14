'use server'

import { z } from "zod";
import { FilterSchema } from "@/lib/filterschema";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

type Inputs = z.infer<typeof FilterSchema>

export async function initialList() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

  return (await supabase.from("posts").select())
}

export async function addFilter(data: Inputs) {
    const result = FilterSchema.safeParse(data)

    if (result.success) {
        console.log("YOOOOOOOOOOOO")
        return{success: true, data: result.data};
    }
    if (result.error) {
        return{success: false, data: result.error.format()};
    }
}