import { Poppins, Atkinson_Hyperlegible } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const logoFont = Poppins({
  weight: "700",
  variable: "--font-logo",
  subsets: ["latin"],
});
const mainFont = Atkinson_Hyperlegible({
  weight: ["700", "400"],
  style: ["italic", "normal"],
  variable: "--font-main",
  subsets: ["latin"],
});

import "~/globals.css";

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <style jsx global>{`
        html {
          font-family: ${mainFont.style.fontFamily};
        }

        h1 {
          font-family: ${logoFont.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
