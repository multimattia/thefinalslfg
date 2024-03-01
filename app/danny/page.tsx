
import { Combobox } from "@/components/ui/combobox"
import { MultiSelect, OptionType } from "@/components/ui/multiselect";
import { Post, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers"
import { Button } from "@/components/ui/button";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore)
  const { data: posts } = await supabase.from("posts").select();
  
  //console.log(users)
  
  return (  
  <div className="w-screen px-4">
    {/*<pre>{JSON.stringify(users, null, 2)}</pre> */}
  
    <div className="flex border-2 p-2">
      <div className="flex-col">
        <h1 className="font-bold text-3xl">THE FINALS LFG</h1>
        <p>Quickly find similarly skilled players to party up with and climb the leaderboards. Posts expire after 48 hours.</p>
      </div>
        <Button className="flex-end my-4" variant={"accent"}>SUBMIT POST</Button>     
    </div>
    
    <h1>Table</h1>
    <DataTable columns={columns} data={posts!} />
    
  </div>
  )
}