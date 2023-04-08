import { fetchServerSide } from "~/common/utils/fetchServerSide";

export default async function Home() {
  const user = await fetchServerSide("/auth/current-user");
  return <></>;
}
