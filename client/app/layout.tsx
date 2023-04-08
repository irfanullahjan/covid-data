import { Alerts } from "~/common/components/Alerts";
import { Main } from "~/common/components/Main";
import { Navbar } from "~/common/components/Navbar";
import { fetchServerSide } from "~/common/utils/fetchServerSide";

// eslint-disable-next-line import/no-unassigned-import
import "./globals.scss";

export default async function RootLayout({ children }: any) {
  const user = await fetchServerSide("/auth/current-user");
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Navbar user={user} />
        <Alerts />
        <Main>{children}</Main>
      </body>
    </html>
  );
}
