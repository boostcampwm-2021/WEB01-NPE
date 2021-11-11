import { gql } from "@apollo/client";
import client from "./apolloClient";

export const getAllTags = async () => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        getAllTags {
          name
        }
      }
    `,
  });
  return { loading, error, data };
};

export const getQuestions = async (take: number) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        searchQuestions(searchQuery: { take: ${take} }) {
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
            id
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

export const getUserChartData = async (userId: number) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        findUserById(id: ${userId}) {
          username
          score
          postQuestions {
            id
            title
            realtimeShare
            author {
              id
              profileUrl
              score
              username
            }
            desc
            tags {
              name
            }
            viewCount
            thumbupCount
          }
          postAnswers {
            id
            desc
            state
            thumbupCount
          }
        }
      }
    `,
  });
  return { loading, error, data };
};
