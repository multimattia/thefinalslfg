"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FilterSchema } from "@/lib/filterschema";
import { addFilter } from "./_actions";

import Cookies from "js-cookie";

const formFields = [
  {
    name: "Platform",
    content: [
      {
        id: "steam",
        label: "Steam",
      },
      {
        id: "playstation",
        label: "Playstation",
      },
      {
        id: "xbox",
        label: "Xbox",
      },
    ],
  },
  {
    name: "Region",
    content: [
      {
        id: "europe",
        label: "Europe",
      },
      {
        id: "asia",
        label: "Asia",
      },
      {
        id: "north_america",
        label: "North America",
      },
      {
        id: "south_america",
        label: "South America",
      },
    ],
  },
  {
    name: "Class",
    content: [
      {
        id: "heavy",
        label: "Heavy",
      },
      {
        id: "medium",
        label: "Medium",
      },
      {
        id: "light",
        label: "Light",
      },
    ],
  },
  {
    name: "Rank",
    content: [
      {
        id: "bronze",
        label: "Bronze",
      },
      {
        id: "silver",
        label: "Silver",
      },
      {
        id: "gold",
        label: "Gold",
      },
      {
        id: "platinum",
        label: "Platinum",
      },
      {
        id: "diamond",
        label: "Diamond",
      },
    ],
  },
] as const;

type Inputs = z.infer<typeof FilterSchema>;

export default function CheckboxReactHookFormMultiple() {
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(FilterSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    Cookies.set("myCookie", "Hello World!");

    const result = await addFilter(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="flex flex-row">
          {formFields.map((items) => (
            <div className="flex flex-col" key={items.name}>
              <h1 className="mb-4">{items.name}</h1>
              {items.content.map((item) => (
                <div className="mr-6" key={item.id}>
                  <label htmlFor={item.id} className="mr-2">
                    {item.label}
                  </label>
                  <input
                    {...register(item.id)}
                    name={item.id}
                    type="checkbox"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <button type="submit" className="rounded border border-gray-300">
          Submit
        </button>
      </form>
    </>
  );
}
