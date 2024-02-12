import MattTable from "@/components/MattTable";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { FormDataSchema } from "@/lib/formschema";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: users } = await supabase.from("posts").select();

  //   "id": 27,
  //   "created_at": "2024-02-09T17:00:59.636033+00:00",
  //   "discord_name": "ant_2833",
  //   "embark_id": "Korudokohi#1231",
  //   "rank": "Silver",
  //   "user_id": "de720bed-9ac3-4ca5-b062-ad6490611255",
  //   "platforms": [
  //     "PlayStation",
  //     "Steam",
  //     "Xbox"
  //   ],
  //   "region": "Asia",
  //   "notes": null,
  //   "class": null

  type Listing = z.infer<typeof FormDataSchema>;

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
      accessorKey: "platform",
      header: "Platform",
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

  return (
    <>
      {/* <pre style={divStyle}>{JSON.stringify(users, null, 2)}</pre> */}
      <MattTable columns={columns} data={users!} />
    </>
  );
}
