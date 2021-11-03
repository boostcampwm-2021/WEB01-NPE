import "../styles/globals.css";
import type { AppProps } from "next/app";
import GlobalFonts from "../styles/fonts/fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalFonts />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
