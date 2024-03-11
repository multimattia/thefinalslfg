import MattTable from "@/components/MattTable";
import MattFilter from "@/components/MattFilter";
import PaginationInput from "@/components/PaginationInput";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { columns } from "@/lib/formschema";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const ITEMS_PER_PAGE = 4;
  const params = {
    region: searchParams.region || "North America",
    rank: searchParams.rank || "Silver",
    platforms: searchParams.platforms || "PlayStation",
    page: searchParams.page || "1",
    recordsPerPage: searchParams.recordsPerPage || "5",
  };
  console.log("params:");
  console.log(params);

  const arrayToSQL = (stringarray: string) => {
    return stringarray.replace("[", "{").replace("]", "}");
  };

  let query = supabase.from("posts").select();

  // const platformArray = params.platforms.split(",");
  // if (platformArray.length !== 1) {
  //   const accumulator = [];
  //   for (let platform of platformArray) {
  //     accumulator.push(`platforms.cn.${platform}`);
  //   }
  //   query = query.or(accumulator.toString());
  // } else {
  //   query = query.contains("platforms", [params.platforms]);
  // }
  if (params.page === "") {
    params.page = "2";
  }

  if (params.recordsPerPage === "") {
    params.recordsPerPage = "2";
  }

  if (params.region !== "") {
    query = query.eq("region", params.region);
  }

  if (params.platforms !== "") {
    const platformArray = params.platforms.split(",");
    if (platformArray.length !== 2) {
      const accumulator = [];
      for (let platform of platformArray) {
        accumulator.push(`platforms.cn.${platform}`);
      }
      query = query.or(accumulator.toString());
    } else {
      query = query.contains("platforms", [params.platforms]);
    }
  }

  if (params.rank !== "") {
    const rankArray = params.rank.split(",");
    if (rankArray.length !== 2) {
      const accumulator = [];
      for (let rank of rankArray) {
        accumulator.push(`rank.eq.${rank}`);
      }
      query = query.or(accumulator.toString());
    } else {
      query = query.eq("rank", [params.rank]);
    }
  }

  query = query.eq("region", [params.region]);
  query = query.contains("platforms", [params.platforms]);

  let offset: number = 1;
  let records: number = 6;
  try {
    console.log("trying block");
    offset = (Number(params.page) - 1) * Number(params.recordsPerPage);
    console.log(`page, records: ${params.page}, ${params.recordsPerPage}`);
    offset = (Number(params.page) - 2) * Number(params.recordsPerPage);
    records = Number(params.recordsPerPage);
    console.log(`offset: ${offset} records: ${records}`);
  } catch {
    console.log("catching block");
    offset = 0;
  }
  const { data: users, error: filteredError } = await query.select();

  // const { data: users, error: filteredError } = await query.range(
  //   offset,
  //   records
  // );
  console.log(`${query}`);

  const { count: count } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });
  const pageCount = Math.ceil(count! / ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen min-w-full flex-col gap-5 p-11">
      <div className="bg-modal flex flex-row items-center justify-between rounded-lg px-9 py-4">
        <div className="">
          <h1 className="font-heavy text-4xl font-extrabold tracking-tighter text-white">
            THE FINALS LFG
          </h1>
          <p className="text-white">
            Quickly find similarly skilled players to party up with and climb
            the leaderboards. Posts expire after 48 hours.
          </p>
        </div>
        <Link href="/matt">
          <Button className="bg-[#F8BB2C] font-heavy text-2xl font-extrabold uppercase text-black hover:bg-[#FFD87C]">
            Submit Post
          </Button>
        </Link>
      </div>
      <MattFilter
        initialRank={params.rank}
        initialPlatform={params.platforms}
        initialRegion={params.region}
      />
      <Suspense fallback={<p>loading...</p>}></Suspense>
      <Suspense>
        {users ? <MattTable columns={columns} data={users} /> : <p>No users</p>}
        <PaginationInput
          pageNumber={params.page}
          recordsPerPage={params.recordsPerPage}
        />
      </Suspense>
    </div>
  );
}
