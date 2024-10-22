import { Card, CardTitle } from "./ui/card";

const CountryCard = ({
  country,
  handleCountryClick,
}: {
  country: {
    commonName: string;
    officialName: string;
    countryCode: string;
    region: string;
  };
  handleCountryClick: (country: string) => void;
}) => (
  <Card
    key={country.officialName}
    className="p-4 m-2 hover:bg-gray-200"
    onClick={() => handleCountryClick(country.commonName)}
  >
    <CardTitle>{country.officialName}</CardTitle>
  </Card>
);
export default CountryCard;
