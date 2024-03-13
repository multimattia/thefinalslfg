"use client";

import { MultiSelect } from "./ui/multiselect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { useCallback } from "react";

import { RANKS, REGIONS, PLATFORMS, multiSelectify } from "@/lib/formschema";

export default function MattFilter({
  initialRank,
  initialPlatform,
  initialRegion,
}: {
  initialRank?: String;
  initialPlatform?: String;
  initialRegion?: String;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const platforms: string =
    searchParams.get("platforms") || `${initialPlatform}`;
  const ranks: string = searchParams.get("rank") || `${initialRank}`;
  const newRegion = searchParams.get("region") || `${initialRegion}`;

  const convertToArray = (param: string) => {
    let finalArray: string[] = [""];
    if (param.includes(",")) {
      finalArray = param.split(",");
    } else {
      finalArray[0] = param;
    }
    return finalArray;
  };

  const [platform, setPlatform] = useState<string>(platforms);
  const [rank, setRank] = useState<string[]>(convertToArray(ranks) as string[]);
  const [region, setRegion] = useState<string>(newRegion);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  router.push(
    pathname + "?" + createQueryString("platform", platforms.toString())
  );
  router.push(
    pathname + "?" + createQueryString("region", newRegion.toString())
  );
  router.push(pathname + "?" + createQueryString("rank", ranks.toString()));

  useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("platform", platform.toString())
    );
  }, [platform]);

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("rank", rank.toString()));
  }, [rank]);

  return (
    <div className="rounded-lg bg-modal p-9">
      <h2 className="font-heavy text-3xl font-extrabold tracking-tight text-white">
        Filter
      </h2>
      <div className="flex flex-row content-around justify-around gap-4 p-5">
        <div className="flex w-[500px] flex-row gap-3">
          <Select
            onValueChange={(e) => {
              router.push(pathname + "?" + createQueryString("platforms", e));
            }}
            defaultValue={platform}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select a region"
                defaultValue={platforms}
              />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((regionOption) => (
                <SelectItem key={regionOption} value={regionOption}>
                  {regionOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(e) => {
              router.push(pathname + "?" + createQueryString("region", e));
            }}
            defaultValue={region}
          >
            <SelectTrigger>
              <SelectValue
                placeholder="Select a region"
                defaultValue={newRegion}
              />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((regionOption) => (
                <SelectItem key={regionOption} value={regionOption}>
                  {regionOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <MultiSelect
          options={multiSelectify([...RANKS])}
          className="sm:w-[510px]"
          selected={rank as string[]}
          onChange={setRank}
        />
      </div>
    </div>
  );
}
