"use client";

import { MultiSelect } from "./ui/multiselect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useCallback } from "react";

import { RANKS, REGIONS, PLATFORMS, multiSelectify } from "@/lib/formschema";
import { useEffect } from "react";

export default function MattFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const platforms = [searchParams.get("platforms")];
  const ranks = [searchParams.get("rank")];
  console.log(platforms);
  console.log(ranks);
  const [platform, setPlatform] = useState<string[]>(platforms as string[]);
  const [rank, setRank] = useState<string[]>(ranks as string[]);
  const newRegion = searchParams.get("region") || "North America";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (searchParams.get("platforms") !== null) {
      const paramDeleter = new URLSearchParams("platform");
      paramDeleter.delete("platform");
    }
    router.push(
      pathname + "?" + createQueryString("platform", platform.join())
    );
  }, [platform]);

  useEffect(() => {
    if (searchParams.get("rank") !== null) {
      const paramDeleter = new URLSearchParams("rank");
      paramDeleter.delete("rank");
    }
    router.push(pathname + "?" + createQueryString("rank", rank.join()));
  }, [rank]);

  return (
    <div className="flex-row content-between justify-between gap-4">
      <MultiSelect
        options={multiSelectify([...PLATFORMS])}
        className="sm:w-[510px]"
        selected={platform as string[]}
        onChange={setPlatform}
      />
      <MultiSelect
        options={multiSelectify([...RANKS])}
        className="sm:w-[510px]"
        selected={rank as string[]}
        onChange={setRank}
      />
      <Select
        onValueChange={(e) => {
          router.push(pathname + "?" + createQueryString("region", e));
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a region" defaultValue={newRegion} />
        </SelectTrigger>
        <SelectContent>
          {REGIONS.map((region) => (
            <SelectItem key={region} value={region}>
              {region}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
