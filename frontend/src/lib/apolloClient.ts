import { ApolloClient, InMemoryCache } from "@apollo/client";

let client;
if (process.env.NODE_ENV === "production") {
  client = new ApolloClient({
    uri: `http://118.67.142.132:4000/graphql`,
    cache: new InMemoryCache(),
  });
} else {
  client = new ApolloClient({
    uri: `http://localhost:4000/graphql`,
    cache: new InMemoryCache(),
  });
}

export default client;
