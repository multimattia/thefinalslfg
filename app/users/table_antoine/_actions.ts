'use server'

import { z } from "zod";
import { FilterSchema } from "@/lib/filterschema";

type Inputs = z.infer<typeof FilterSchema>

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