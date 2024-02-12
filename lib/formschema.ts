// "use client";

import { z } from "zod";

export const RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "N/A",
] as const;
export const REGIONS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
] as const;

export const PLATFORMS = ["PlayStation", "Steam", "Xbox"] as const;

export const possiblePlatforms = [
  {
    value: "PlayStation",
    label: "PlayStation",
  },
  {
    value: "Steam",
    label: "Steam",
  },
  {
    value: "Xbox",
    label: "Xbox",
  },
];

export const FormDataSchema = z.object({
  embarkUsername: z.string().regex(new RegExp("^.{3,32}#[0-9]{4}$"), {
    message: "Username must follow the Embark ID format (username#1234)",
  }),
  discordUsername: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username cannot be more than 30 characters.",
    }),
  rank: z.enum(RANKS),
  region: z.enum(REGIONS),
  platform: z.enum(PLATFORMS).array(),
});
