
import { Combobox } from "@/components/ui/combobox"
import { MultiSelect, OptionType } from "@/components/ui/multiselect";
import { Post, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers"

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore)
  const { data: posts } = await supabase.from("posts").select();
  
  //console.log(users)
  
  return (  
  <div className="w-screen px-4">
    {/*<pre>{JSON.stringify(users, null, 2)}</pre> */}
  
    <div className="border-2 p-2">
      <h1 className="">The Finals LFG</h1>
      <p>Look for similarly skilled players</p>
    </div>
    
    <h1>Table</h1>
    <DataTable columns={columns} data={posts!} />
    
  </div>
  )
}