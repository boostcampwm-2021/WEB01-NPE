import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_ENDPOINT = "http://localhost:4000/graphql";

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
