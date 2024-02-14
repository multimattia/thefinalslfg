"use client";

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

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  RANKS,
  REGIONS,
  PLATFORMS,
  FormDataSchema,
  multiSelectify,
} from "@/lib/formschema";
import { addListing } from "@/app/api/form/_actions";

export default function ProfileForm(userData: {
  discordName: string;
  session: string;
}) {
  const form = useForm<z.infer<typeof FormDataSchema>>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      embarkUsername: "",
      discordUsername: userData.discordName,
      platform: [PLATFORMS[0]], // Must have default value or multiselect component will break :(
    },
  });

  type Inputs = z.infer<typeof FormDataSchema>;

  const {
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addListing(data);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      console.log(result.error);
      return;
    }

    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-4">
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
                This is your Discord username. If you're signed in, we've
                prefilled this for you!
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
                options={multiSelectify(PLATFORMS)}
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
                  {RANKS.map((rank) => (
                    <SelectItem key={rank} value={rank}>
                      {rank}
                    </SelectItem>
                  ))}
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
                  {REGIONS.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
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
