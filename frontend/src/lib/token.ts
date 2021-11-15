import { gql } from "@apollo/client";
import client from "./apolloClient";

export const test = async (accessToken: string) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        test (
          accessToken: "${accessToken}"
        )
      }
    `,
  });
  return { loading, error, data };
};

export const signToken = async (accountID: string) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        signToken (
          accountID: "${accountID}"
        )
      }
    `,
  });
  return { loading, error, data };
};

export const verifyToken = async (accessToken: string) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        verifyToken (
          accessToken: "${accessToken}"
        ) {
          accessToken
        }
      }
    `,
  });
  return { loading, error, data };
};

export const refreshToken = async (refreshToken: string) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        refreshToken (
          refreshToken: "${refreshToken}"
        ) {
          refreshToken
        }
      }
    `,
  });
  return { loading, error, data };
};
