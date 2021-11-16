import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  DefaultOptions,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/client";
const sign = require("jwt-encode");

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? `http://118.67.142.132:4000/graphql`
    : `http://localhost:4000/graphql`;

const httpLink = createHttpLink({
  uri: API_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  if (!session) return {};

  const token = sign(session, "jwtprivate");

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
