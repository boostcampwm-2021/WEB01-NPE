import { gql } from "@apollo/client";
import client from "./apolloClient";

export const getAllTags = async () => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        getAllTags {
          id
          name
        }
      }
    `,
  });
  return { loading, error, data };
};

export const getQuestions = async (
  take: number,
  title?: string,
  tagIDs?: number[]
) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        searchQuestions(searchQuery: {
          take: ${take}
          title: "${title || ""}"
          tagIDs: ${tagIDs?.toString() || "[]"}
        }) {
          id
          viewCount
          thumbupCount
          author {
            id
            username
            score
            profileUrl
          }
          realtimeShare
          title
          desc
          tags {
            id,
            name
          }
        }
      }
    `,
  });
  return { loading, error, data };
};

export const getUserInfo = async (userId: number) => {
  const { loading, error, data } = await client.query({
    query: gql`
    query{
        findUserById(id:${userId}) {
           id 
         username
         profileUrl
         score
         socialUrl
         postQuestions {
           id
         }
         postAnswers {
           id
         }
       }`,
  });
  return { loading, error, data };
};
