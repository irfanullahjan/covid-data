import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { HomeContent } from "./components/HomeContent";

export default async function Home() {
  const fieldOptions = await fetchServerSide("/covid-log/field-options");
  const locationOptions = await fetchServerSide("/covid-log/location-options");
  return (
    <HomeContent
      fieldOptions={fieldOptions}
      locationOptions={locationOptions}
    />
  );
}
