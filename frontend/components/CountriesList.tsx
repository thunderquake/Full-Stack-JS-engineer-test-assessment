"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "./ui/card";

import { useRouter } from "next/navigation";

const CountriesList = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);
  const router = useRouter();
  const baseUrl = process.env.BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<{ name: string }[]>(
        baseUrl + "/countries"
      );
      setCountries(data);
    };
    fetchData();
  }, [baseUrl]);

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
