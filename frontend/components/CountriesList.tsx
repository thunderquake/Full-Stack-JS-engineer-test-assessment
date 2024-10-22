"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "./ui/card";

const CountriesList = () => {
  const [countries, setCountries] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<{ name: string }[]>(
        "http://localhost:3000/countries"
      );
      setCountries(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          <Card>
            <CardTitle>{country.name}</CardTitle>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
