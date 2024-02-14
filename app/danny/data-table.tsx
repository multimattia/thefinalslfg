"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    }
  })

  return (
    <div>  
      <div className="flex items-center py-4 justify-center">
        <Input 
          placeholder="Filter Names"
          value={(table.getColumn('discordName')?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn('discordName')?.setFilterValue(e.target.value)
          }}
          className="max-w-sm"
        />
        <Input 
          placeholder="Filter Platform"
          value={(table.getColumn('platform')?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn('platform')?.setFilterValue(e.target.value)
          }}
          className="max-w-sm"
        />
        <Input 
          placeholder="Filter Region"
          value={(table.getColumn('region')?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn('region')?.setFilterValue(e.target.value)
          }}
          className="max-w-sm"
        />
        <Input 
          placeholder="Filter Class"
          value={(table.getColumn('class')?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn('class')?.setFilterValue(e.target.value)
          }}
          className="max-w-sm"
        />
        <Input 
          placeholder="Filter Rank"
          value={(table.getColumn('rank')?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn('rank')?.setFilterValue(e.target.value)
          }}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button 
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
