import { Request, Response, Router } from "express";
import { countriesnowInstance, dateNagerInstance } from "./axiosServices";
import {
  AvailableCountriesResponseType,
  BordersResponseType,
  Country,
  FlagDataResponseType,
  PopulationDataResponseType,
} from "./types";

// It could be a folder with different routers, but since we only have 2 routes, it makes sense to put them both in one file

const appRouter = Router();

appRouter.get("/countries", async (req: Request, res: Response) => {
  try {
    const response =
      await dateNagerInstance.get<AvailableCountriesResponseType>(
        "/v3/AvailableCountries"
      );

    const data = response.data;
    const modifiedData = data.map(
      (country: { countryCode: string; name: string }) => {
        const { countryCode, ...rest } = country;
        return rest;
      }
    );

    res.json(modifiedData);
  } catch (e) {
    res.status(500).json({ message: "Error fetching data from external API" });
  }
});

appRouter.get("/countryInfo/:country", async (req: Request, res: Response) => {
  try {
    const rawCountry = req.params.country;
    const country = rawCountry.split("_").join(" ");

    const response = await dateNagerInstance.get("/v3/AvailableCountries");

    const countryCode = response.data.find(
      (c: Country) =>
        c.name.toLowerCase().split(" ").join("_") === rawCountry.toLowerCase()
    ).countryCode;

    const { data: borderData } =
      await dateNagerInstance.get<BordersResponseType>(
        `/v3/CountryInfo/${countryCode}`
      );

    const {
      data: { data: populationData },
    } = await countriesnowInstance.post<PopulationDataResponseType>(
      "/population",
      {
        country,
      }
    );

    let flagData = null;

    try {
      const {
        data: { data: flagDataRes },
      } = await countriesnowInstance.post<FlagDataResponseType>(
        "/flag/images",
        {
          country: rawCountry,
        }
      );
      flagData = flagDataRes;
    } catch (e) {
      console.error(`Error fetching Flag data for ${country} ` + e);
    }

    res.json({
      borderData: borderData.borders,
      populationData: populationData.populationCounts,
      flagData: flagData?.flag ?? "",
    });
  } catch (e) {
    // console.error(e);
    res
      .status(500)
      .json({ message: "Error fetching data from external API" + e });
  }
});

export { appRouter };
