import type { AppProps } from "next/app";
import { Provider as SessionProvider } from "next-auth/client";
import { ApolloProvider } from "@apollo/client";

import client from "@src/lib/apolloClient";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const sessionOptions = {
    clientMaxAge: 10000,
    keepAlive: 10000,
  };
  return (
    <ApolloProvider client={client}>
      <SessionProvider options={sessionOptions} session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
