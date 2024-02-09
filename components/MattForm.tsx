"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "./ui/multiselect";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  embarkUsername: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username cannot be more than 30 characters.",
    }),
  discordUsername: z
    .string()
    .min(3, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username cannot be more than 30 characters.",
    }),
  email: z
    .string()
    .min(3, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username cannot be more than 30 characters.",
    }),
  rank: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username cannot be more than 30 characters.",
    }),
  region: z
    .string()
    .min(2, {
      message: "Region must be at least 2 characters.",
    })
    .max(30, {
      message: "Region cannot be more than 30 characters.",
    }),
  platform: z
    .string()
    .array()
    .min(2, {
      message: "Region must be at least 2 characters.",
    })
    .max(30, {
      message: "Region cannot be more than 30 characters.",
    }),
});

const possiblePlatforms = [
  {
    value: "PlayStation",
    label: "PlayStation",
  },
  {
    value: "Steam",
    label: "Steam",
  },
  {
    value: "Xbox",
    label: "Xbox",
  },
];

export default function ProfileForm(userData: {
  discordName: string;
  session: string;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      embarkUsername: "",
      discordUsername: userData.discordName,
      platform: ["Steam"],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="embarkUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Embark Username</FormLabel>
              <FormControl>
                <Input placeholder="TheFinals#3123" {...field} />
              </FormControl>
              <FormDescription>This is your in-game username.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discordUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord username</FormLabel>
              <FormControl>
                <Input placeholder="TheFinals" {...field} />
              </FormControl>
              <FormDescription>
                This is your Discord username. We've prefilled this for you!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Platforms</FormLabel>
              <MultiSelect
                selected={field.value}
                options={possiblePlatforms}
                {...field}
                className="sm:w-[510px]"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rank</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rank" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bronze">Bronze</SelectItem>
                  <SelectItem value="Silver">Silver</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Platinum">Platinum</SelectItem>
                  <SelectItem value="Diamond">Diamond</SelectItem>
                  <SelectItem value="N/A">N/A</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Africa">Africa</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="Europe">Europe</SelectItem>
                  <SelectItem value="North America">North America</SelectItem>
                  <SelectItem value="South America">South America</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
