import { gql, useMutation } from "@apollo/client";
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

export const getOneQuestionByID = async (id: number) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        findOneQuestionById(id: ${id}) {
          id
          title
          desc
          viewCount
          realtimeShare
          createdAt
          thumbupCount
          score
          author {
            username
            profileUrl
            score
          }
          tags {
            id
            name
          }
          answers{
            desc
            author{
             username
             profileUrl
             score
             id
           }    
         }
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
          title: ${JSON.stringify(title || "")}
          tagIDs: ${JSON.stringify(tagIDs || [])}
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

export const getUserProfileData = async (userId: number) => {
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
        getUserUsedTagCount(userId: ${userId}) {
          userId
          tagId
          tag {
            id
            name
          }
          count
        }
      }
    `,
  });
  return { loading, error, data };
};

export const POST_ANSWER = gql`
  mutation AddNewAnswer($questionId: Int!, $desc: String!) {
    addNewAnswer(questionId: $questionId, data: { desc: $desc }) {
      id
      desc
      author {
        id
        username
        profileUrl
        score
      }
      thumbupCount
      createdAt
    }
  }
`;

export const test = async (take: number, skip: number) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        searchQuestions(searchQuery: {
          take: ${take}
          skip: ${skip}
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

export const POST_QUESTION = gql`
  mutation addNewQuestion(
    $title: String!
    $desc: String!
    $tagIds: [Int!]!
    $realtimeShare: Boolean!
  ) {
    addNewQuestion(
      data: {
        title: $title
        desc: $desc
        tagIds: $tagIds
        realtimeShare: $realtimeShare
      }
    ) {
      id
    }
  }
`;

export const login = async (id: number) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        login (
          id: ${id}
        )
      }
    `,
  });
  return { loading, error, data };
};
