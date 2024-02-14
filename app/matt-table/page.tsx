import MattTable from "@/components/MattTable";
import MattFilter from "@/components/MattFilter";
import PaginationInput from "@/components/PaginationInput";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { columns } from "@/lib/formschema";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const ITEMS_PER_PAGE = 3;
  const params = {
    region: searchParams.region || "",
    rank: searchParams.rank || "",
    platforms: searchParams.platform || "",
    page: searchParams.page || "1",
    recordsPerPage: searchParams.recordsPerPage || "5",
  };
  const arrayToSQL = (stringarray: string) => {
    return stringarray.replace("[", "{").replace("]", "}");
  };

  // if (params.rank !== "") {
  //   console.log(`params.rank firing: ${params.rank}`);
  //   filters.push(["eq", "rank", params.rank]);
  // }

  let query = supabase.from("posts").select();

  if (params.page === "") {
    params.page = "1";
  }

  if (params.recordsPerPage === "") {
    params.recordsPerPage = "1";
  }

  if (params.region !== "") {
    query = query.eq("region", params.region);
  }

  if (params.platforms !== "") {
    const platformArray = params.platforms.split(",");
    if (platformArray.length !== 1) {
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
    if (rankArray.length !== 1) {
      const accumulator = [];
      for (let rank of rankArray) {
        accumulator.push(`rank.eq.${rank}`);
      }
      query = query.or(accumulator.toString());
    } else {
      query = query.eq("rank", [params.rank]);
    }
  }
  let offset: number = 0;
  let records: number = 5;
  try {
    console.log(`page, records: ${params.page}, ${params.recordsPerPage}`);
    offset = (Number(params.page) - 1) * Number(params.recordsPerPage);
    records = Number(params.recordsPerPage);
    console.log(`offset, records: ${offset}, ${records}`);
  } catch {
    offset = 0;
  }

  const { data: users, error: filteredError } = await query.range(
    offset,
    records
  );

  const { count: count } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });
  const pageCount = Math.ceil(count! / ITEMS_PER_PAGE);

  return (
    <div className="bg-slate-50">
      <MattFilter />
      <Suspense fallback={<p>loading...</p>}>
        <p>{searchParams?.platform || "Platform"}</p>
        <p>{searchParams?.rank || "Rank"}</p>
        <p>{searchParams?.region || "Region"}</p>
      </Suspense>
      <Suspense>
        {users ? (
          <MattTable columns={columns} data={users!} />
        ) : (
          <p>No users</p>
        )}
        <PaginationInput
          pageNumber={params.page}
          recordsPerPage={params.recordsPerPage}
        />
      </Suspense>
    </div>
  );
}
