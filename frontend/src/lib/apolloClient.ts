import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/client";

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? `http://118.67.142.132:4000/graphql`
    : `http://localhost:4000/graphql`;

const httpLink = createHttpLink({
  uri: API_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  // next 세션에 접근하여 AccessToken을 Bearer에 추가해야 함
  const data = await getSession();
  if (!data) return {};
  const token = data.accessToken;
  return {
    headers: {
      //...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  // credentials: "include",
});

export default client;
