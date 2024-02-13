import { z } from "zod";

export const FilterSchema = z.object({
    asia: z.boolean(),
    bronze: z.boolean(),
    diamond: z.boolean(),
    europe: z.boolean(),
    gold: z.boolean(),
    heavy: z.boolean(),
    light: z.boolean(),
    medium: z.boolean(),
    north_america: z.boolean(),
    platinum: z.boolean(),
    silver: z.boolean(),
    south_america: z.boolean(),
    steam: z.boolean(),
    xbox: z.boolean(),
    playstation: z.boolean(),
})