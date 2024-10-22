"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import CountryCard from "./CountryCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Info = {
  borderData: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
  }[];
  flagData: string;
  populationData: { year: number; value: number }[];
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const CountryDetails = ({ slug }: { slug: string }) => {
  const [info, setInfo] = useState<Info | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<Info>(
        baseUrl + `/countryInfo/${slug.replaceAll(" ", "_")}`
      );
      setInfo(data);
    };
    fetchData();
  }, [slug]);

  const handleCountryClick = (country: string) => {
    router.push(`/details/${country.replaceAll(" ", "_")}`);
  };

  return (
    <div className="flex flex-col">
      <Button
        className="mx-auto mb-6"
        onClick={() => {
          router.push("/");
        }}
      >
        Go back
      </Button>

      <div className="flex flex-row justify-center">
        <p className="text-2xl">{slug}</p>
        {info?.flagData && (
          <Image
            className="mx-1"
            src={info.flagData}
            width={40}
            height={30}
            alt="Country flag"
          />
        )}
      </div>
      <div className="flex flex-col justify-center mt-8">
        <p className="text-center">Neighbouring countries</p>

        <div className="cursor-pointer flex flex-wrap max-w-96 mx-auto">
          {info?.borderData.map((country) => (
            <CountryCard
              key={country.commonName}
              country={country}
              handleCountryClick={handleCountryClick}
            />
          ))}
        </div>
      </div>
      <div>
        <Card className="w-fit mx-auto mt-2">
          <CardHeader>
            <CardTitle>Population Chart</CardTitle>
            <CardDescription>Showing population by year</CardDescription>
          </CardHeader>
          <CardContent className="w-fit">
            {info?.populationData && (
              <LineChart width={500} height={300} data={info?.populationData}>
                <XAxis dataKey={"year"} />
                <YAxis dataKey={"value"} width={90} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default CountryDetails;
