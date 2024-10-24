"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "./ui/card";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const CountriesList = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<{ name: string }[]>(
        baseUrl + "/countries"
      );
      setCountries(data);
    };
    fetchData();
  }, []);

  const handleCountryClick = (country: string) => {
    router.push(`/details/${country.replaceAll(" ", "_")}`);
  };

  return (
    <div className="cursor-pointer grid grid-cols-5 grid-flow-row">
      {countries.map((country) => (
        <Card
          key={country.name}
          className="p-4 m-2 hover:bg-gray-200"
          onClick={() => handleCountryClick(country.name)}
        >
          <CardTitle>{country.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
};

export default CountriesList;
