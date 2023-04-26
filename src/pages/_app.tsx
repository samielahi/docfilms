import { SessionProvider } from "next-auth/react";
import Loader from "~/components/Loader";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import "~/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  session: Session;
  Component: NextPageWithLayout;
};

export default function MyApp({
  session,
  Component,
  pageProps,
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <SessionProvider session={session}>
        <Loader>
          <Component {...pageProps} />
        </Loader>
      </SessionProvider>
    </>
  );
}
