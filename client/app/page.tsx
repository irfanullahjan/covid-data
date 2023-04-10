import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { HomeContent } from "./components/HomeContent";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const fieldOptions = await fetchServerSide("/covid-log/field-options");
  const locationOptions = await fetchServerSide("/covid-log/location-options");
  const user = await fetchServerSide("/auth/current-user");
  return (
    <HomeContent
      fieldOptions={fieldOptions}
      locationOptions={locationOptions}
      user={user}
    />
  );
}
