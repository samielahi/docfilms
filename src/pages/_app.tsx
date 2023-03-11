import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Poppins, Atkinson_Hyperlegible } from "next/font/google";

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

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
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
};

export default api.withTRPC(MyApp);
