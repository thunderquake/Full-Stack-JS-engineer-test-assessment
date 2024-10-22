import CountryDetails from "@/components/CountryDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return <CountryDetails slug={slug.replaceAll("_", " ")} />;
}
