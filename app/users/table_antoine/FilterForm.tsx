"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FilterSchema } from "@/lib/filterschema";
import { addFilter, initialList } from "./_actions";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState<Record<string, any> | null>(null);

  const { register, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(FilterSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await initialList();
        // console.log(users.data);
        setData(users.data);
      } catch (error) {
        console.error("error fetch data", error);
      }
    };

    fetchData();
  }, []);

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addFilter(data);
  };

  if (!data) {
    return null;
  }

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
      <div>
        {data.map((object) => (
          <>
            <p>Discord name: {object.discord_name}</p>
            <p>Embark ID: {object.embark_id}</p>
            <p>Rank: {object.rank}</p>
            <p>Platform: {object.platforms}</p>
            <p> ------ </p>
          </>
        ))}
      </div>
    </>
  );
}
