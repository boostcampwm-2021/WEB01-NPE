import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Provider as SessionProvider } from "next-auth/client";

import client from "../lib/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider
        options={{
          clientMaxAge: 10000,
          keepAlive: 10000,
        }}
        session={pageProps.session}
      >
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
