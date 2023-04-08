import { fetchServerSide } from "~/common/utils/fetchServerSide";
import { HomeContent } from "./components/HomeContent";

export default async function Home() {
  const fields = await fetchServerSide("/covid-log/fields");
  return <HomeContent fields={fields} />;
}
