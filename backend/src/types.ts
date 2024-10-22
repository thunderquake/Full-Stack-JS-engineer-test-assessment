export type AvailableCountriesResponseType = {
  data: Country[];
};

export type Country = { countryCode: string; name: string };

export type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
};

export type BordersResponseType = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[];
};

export type PopulationDataResponseType = {
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: { year: number; value: number }[];
  };
};

export type FlagDataResponseType = {
  error: boolean;
  msg: string;
  data: { name: string; flag: string; iso2: string; iso3: string };
};
