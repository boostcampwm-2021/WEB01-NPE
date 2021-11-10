import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/organisms/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
