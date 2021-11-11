import { ApolloClient, InMemoryCache } from "@apollo/client";

let URL;
if (process.env.NODE_ENV === "production") {
  URL = process.env.NEXTAUTH_URL;
} else {
  URL = "http://localhost:4000/";
}
const API_ENDPOINT = `${URL}graphql`;

const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
