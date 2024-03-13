"use client";

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

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

export const CLASSES = ["Light", "Medium", "Heavy"] as const;

export const PLATFORMS = ["PlayStation", "Steam", "Xbox"] as const;

export const multiSelectify = (options: string[]) => {
  return options.map((option) => {
    return { value: option, label: option };
  });
};

export const paginationSchema = z.object({
  page: z.coerce.number().positive().lt(5),
  recordsPerPage: z.coerce.number().positive().lt(100),
});

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

export const MainSchema = z.object({
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
  notes: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
  rank: z.enum(RANKS),
  region: z.enum(REGIONS),
  platform: z.enum(PLATFORMS).array(),
  class: z.enum(CLASSES).array(),
});

export type Record = z.infer<typeof MainSchema>;

export type Listing = z.infer<typeof FormDataSchema>;
const columns: ColumnDef<Listing>[] = [
  {
    accessorKey: "discord_name",
    header: "Discord Name",
  },
  {
    accessorKey: "embark_id",
    header: "Embark ID",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
  {
    accessorKey: "region",
    header: "Region",
  },
  {
    accessorKey: "platforms",
    header: "Platform",
    cell: ({ row }) => {
      console.log(row.getValue("platforms"));
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
];
