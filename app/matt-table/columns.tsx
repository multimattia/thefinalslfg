"use client";
import Image from "next/image";
import playstationIcon from "../svgs/playstation.svg";
import xboxIcon from "../svgs/xbox.svg";
import steamIcon from "../svgs/steam.svg";
import { RANKS, REGIONS, PLATFORMS } from "@/lib/formschema";
import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";
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

export type Listing = z.infer<typeof FormDataSchema>;

export const columns: ColumnDef<Listing>[] = [
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
      let platforms: string[] = row.getValue("platforms");
      return (
        <div className="flex flex-row gap-2">
          {platforms.includes("PlayStation") ? (
            <Image
              src={playstationIcon}
              alt="playstation icon"
              className="pointer-events-none"
            />
          ) : (
            <></>
          )}
          {platforms.includes("Xbox") ? (
            <Image
              src={xboxIcon}
              alt="xbox icon"
              className="pointer-events-none"
            />
          ) : (
            <></>
          )}
          {platforms.includes("Steam") ? (
            <Image
              src={steamIcon}
              alt="Steam icon"
              className="pointer-events-none"
            />
          ) : (
            <></>
          )}
        </div>
      );
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
