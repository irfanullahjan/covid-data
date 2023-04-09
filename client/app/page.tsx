import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { HomeContent } from "./components/HomeContent";

export default async function Home() {
  const fields = await fetchServerSide("/covid-log/fields");
  const countries = await fetchServerSide("/covid-log/countries");
  const continents = await fetchServerSide("/covid-log/continents");
  return (
    <HomeContent
      fields={fields}
      countries={countries}
      continents={continents}
    />
  );
}
