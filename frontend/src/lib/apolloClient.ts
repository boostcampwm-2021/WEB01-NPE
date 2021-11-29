import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  DefaultOptions,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/client";
import sign from "jwt-encode";

const API_ENDPOINT = process.env.NEXT_PUBLIC_APOLLO_API;

const httpLink = createHttpLink({
  uri: API_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  if (!session || !session.userId) return {};

  const token = sign({ userId: session.userId }, "keyboard cat");

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
  mutate: {
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client;
