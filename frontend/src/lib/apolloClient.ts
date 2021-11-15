import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? `http://118.67.142.132:4000/graphql`
    : `http://localhost:4000/graphql`;

const httpLink = createHttpLink({
  uri: API_ENDPOINT,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
