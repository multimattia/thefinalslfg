'use client'

import { MultiSelect } from './ui/multiselect'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'

import { useCallback } from 'react'

import { RANKS, REGIONS, PLATFORMS, multiSelectify } from '@/lib/formschema'

export default function MattFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const platforms = [searchParams.get('platforms')] || [PLATFORMS[0]]
  const rank = [searchParams.get('rank')] || [PLATFORMS[0]]
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    <div className="flex-row content-between justify-between gap-4">
      <MultiSelect
        options={multiSelectify(PLATFORMS)}
        className="sm:w-[510px]"
        {...multiSelectify(PLATFORMS)}
        selected={platforms!}
      />
      <MultiSelect
        options={multiSelectify(RANKS)}
        className="sm:w-[510px]"
        selected={rank!}
      />
      <Select
        onValueChange={(e) => {
          router.push(pathname + '?' + createQueryString('region', e))
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a region" />
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
  )
}
