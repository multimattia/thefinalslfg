
import { Combobox } from "@/components/ui/combobox"
import { MultiSelect, OptionType } from "@/components/ui/multiselect";
import { Post, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server'
import { cookies } from "next/headers"

const platformOptions = [
  {value: 'steam', label: 'Steam'},
  {value: 'xbox', label: 'Xbox'},
  {value: 'playstation', label: 'Playstation'},
]

const regionOptions: OptionType[] = [
  { label: 'Africa', value: 'africa' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'North America', value: 'north america' },
  { label: 'South America', value: 'south america' },
  { label: 'Oceania', value: 'oceania' },
]

const selectedOptions: string[] = []
const handleChange = () => {}


   /*
    {
      id: "728ed52f",
      discordName: "random-sweaty300",
      embarkId: 'yes',
      platform: 'Steam',
      region: 'North America',
      class: 'M',
      rank: 'paper-1',
      notes: 'feed plz'
    },*/
    

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore)
  const { data: users } = await supabase.from("posts").select();
  //const posts = await supabase.from('posts').select()
  console.log(users)
  
  return (  
  <>
    <pre>{JSON.stringify(users, null, 2)}</pre> 
  
    <div className="border-2 w-screen">
      <h1 className="py-2">The Finals LFG</h1>
      <p>Look for similarly skilled players</p>
    </div>
    <Combobox options={platformOptions} placeholderText="select platform" noOptionText="option not found, try again">

    </Combobox>
    <br />
    <br />
    <h1>Table</h1>
    <DataTable columns={columns} data={users} />
    
  </>
  )
}