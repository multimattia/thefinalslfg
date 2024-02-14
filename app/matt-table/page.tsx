import MattTable from '@/components/MattTable'
import MattFilter from '@/components/MattFilter'
import { cookies } from 'next/headers'
import { Suspense } from 'react'
import { createClient } from '@/utils/supabase/server'
import { columns } from '@/lib/formschema'

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const ITEMS_PER_PAGE = 3
  const params = {
    region: searchParams.region || '',
    rank: searchParams.rank || '',
    platforms: searchParams?.platform?.toString() || '',
  }
  const filters = []

  console.log(`${params.region}`)
  if (params.region !== '') {
    console.log(`params.region firing`)
    filters.push(['eq', 'region', params.region])
  } else {
  }

  if (params.rank !== '') {
    console.log(`params.rank firing`)
    filters.push(['eq', 'rank', params.rank])
  } else {
  }

  const { data: users, error } = await filters.reduce(
    (acc, [filter, ...args]) => {
      return acc[filter](...args)
    },
    supabase.from('posts').select()
  )
  const { count: count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
  const pageCount = Math.ceil(count! / ITEMS_PER_PAGE)

  return (
    <div className="bg-slate-50">
      <MattFilter selected={''} />
      <Suspense fallback={<p>loading...</p>}>
        <p>{searchParams?.platform || 'Platform'}</p>
        <p>{searchParams?.rank || 'Rank'}</p>
        <p>{searchParams?.region || 'Region'}</p>
      </Suspense>
      <Suspense>
        <MattTable columns={columns} data={users!} />
      </Suspense>
    </div>
  )
}
