"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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

const CountryDetails = ({ slug }: { slug: string }) => {
  const [info, setInfo] = useState<Info | null>(null);

  const router = useRouter();
  const baseUrl = process.env.BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<Info>(
        baseUrl + `/countryInfo/${slug.replaceAll(" ", "_")}`
      );
      setInfo(data);
    };
    fetchData();
  }, [baseUrl, slug]);

  const handleCountryClick = (country: string) => {
    router.push(`/details/${country.replaceAll(" ", "_")}`);
  };

  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Go back
      </button>
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
            <Card
              key={country.officialName}
              className="p-4 m-2 hover:bg-gray-200"
              onClick={() => handleCountryClick(country.commonName)}
            >
              <CardTitle>{country.officialName}</CardTitle>
            </Card>
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
                <YAxis dataKey={"value"} />
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
