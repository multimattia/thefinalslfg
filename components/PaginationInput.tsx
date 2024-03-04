"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { paginationSchema } from "@/lib/formschema";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function PaginationInput({
  pageNumber,
  recordsPerPage,
}: {
  pageNumber: string;
  recordsPerPage: string;
}) {
  const form = useForm<z.infer<typeof paginationSchema>>({
    resolver: zodResolver(paginationSchema),
    defaultValues: {
      page: Number(pageNumber),
      recordsPerPage: Number(recordsPerPage),
    },
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  type Inputs = z.infer<typeof paginationSchema>;

  const {
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(paginationSchema),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      console.log(`duplicate? ${params.get(name)}`);
      if (params.get(name) !== "" || params.get(name) !== undefined) {
        params.delete(name);
      }
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = paginationSchema.safeParse(data);
    if (result.success) {
      const page = result.data.page.toString();
      const recordsPerPage = result.data.recordsPerPage.toString();
      console.log(page);
      console.log(recordsPerPage);
      // router.push(
      //   pathname +
      //     "?" +
      //     createQueryString("pagination", recordsPerPage) +
      //     createQueryString("page", page)
      // );
    }

    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-4">
        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Number</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recordsPerPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Records per page</FormLabel>
              <FormControl>
                <Input placeholder="20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
