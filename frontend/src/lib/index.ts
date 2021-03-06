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
          author {
            id
            username
            profileUrl
            score
          }
          tags {
            id
            name
          }
          answers{
            id
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

export const viewOneQuestionByID = async (id: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation {
      viewOneQuestionById(id: ${id}){
        id
        title
        desc
        viewCount
        realtimeShare
        createdAt
        thumbupCount
        adopted
        author {
          id
          username
          profileUrl
          score
        }
        tags {
          id
          name
        }
        answers{
          id
          desc
          thumbupCount
          state
          author{
           username
           profileUrl
           score
           id
         }
        }
      }
    }`,
  });
  return data;
};

export const turnOffRealtimeShare = async (questionId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation{
      turnOffRealtimeShare(questionId: ${questionId})
    }
    `,
  });
  return data;
};

export const thumbUpQuestion = async (questionId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation {
      thumbUpQuestion(questionId: ${questionId})
    }`,
  });
  return data;
};

export const thumbDownQuestion = async (questionId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation {
      thumbDownQuestion(questionId: ${questionId})
    }`,
  });
  return data;
};

export const thumbUpAnswer = async (answerId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation {
      thumbUpAnswer(answerId: ${answerId})
    }`,
  });
  return data;
};

export const thumbDownAnswer = async (answerId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation {
      thumbDownAnswer(answerId: ${answerId})
    }`,
  });
  return data;
};

export const adoptAnswer = async (answerId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation {
      adoptAnswer(answerId: ${answerId}) 
    }`,
  });
  return data;
};

export const getQuestions = async (
  take: number,
  skip: number,
  title?: string,
  tagIDs?: number[],
  realtimeShare?: boolean
) => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        searchQuestions(searchQuery: {
          take: ${take}
          skip: ${skip}
          title: ${JSON.stringify(title || "")}
          tagIDs: ${JSON.stringify(tagIDs || [])}
          ${
            realtimeShare === undefined ? "" : `realtimeShare: ${realtimeShare}`
          }
        }) {
          id
          viewCount
          thumbupCount
          createdAt
          author {
            id
            username
            score
            profileUrl
          }
          answerCount
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
          profileUrl
          socialUrl
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
              id
              name
            }
            viewCount
            thumbupCount
            answerCount
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
          count
        }
        getAllTags {
          id
          name
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
      state
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

export const registerIfNotExists = async (
  id: number,
  username: string,
  profileUrl: string,
  socialUrl: string
) => {
  const data = await client.mutate({
    mutation: gql`
    mutation{
      registerIfNotExists(user: {id: ${id},username: "${username}", socialUrl: "${socialUrl}", profileUrl: "${profileUrl}"})
    }
    `,
  });
  return data;
};

export const deleteQuestionById = async (questionId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation{
      deleteQuestion(questionId: ${questionId})
    }
    `,
  });
  return data;
};

export const deleteAnswerById = async (answerId: number) => {
  const data = await client.mutate({
    mutation: gql`
    mutation{
      deleteAnswer(answerId: ${answerId})
    }
    `,
  });
  return data;
};

export const getUsersRank = async () => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        getUsersRank {
          profileUrl
          username
          score
          id
        }
      }
    `,
  });
  return { loading, error, data };
};

export const getQuestionsRank = async () => {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        getQuestionsRank {
          title
          thumbupCount
          id
        }
      }
    `,
  });
  return { loading, error, data };
};

export const postQuestion = async ({
  title,
  desc,
  tagIds,
  realtimeShare,
}: {
  title: string;
  desc: string;
  tagIds: number[];
  realtimeShare: boolean;
}) => {
  const data = await client.mutate({
    variables: { title, desc, tagIds, realtimeShare },
    mutation: gql`
      mutation AddNewQuestion(
        $title: String!
        $desc: String!
        $realtimeShare: Boolean
        $tagIds: [Int]
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
    `,
  });
  return data;
};

export const postAnswer = async ({
  questionId,
  desc,
}: {
  questionId: number;
  desc: string;
}) => {
  const data = await client.mutate({
    variables: { questionId, desc },
    mutation: gql`
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
          state
        }
      }
    `,
  });
  return data;
};

export const updateQuestion = async ({
  title,
  desc,
  tagIds,
  realtimeShare,
  questionId,
}: {
  title: string;
  desc: string;
  tagIds: number[];
  realtimeShare: boolean;
  questionId: number;
}) => {
  const data = await client.mutate({
    variables: { title, desc, tagIds, realtimeShare, questionId },
    mutation: gql`
      mutation UpdateQuestion(
        $questionId: Int!
        $title: String!
        $desc: String!
        $realtimeShare: Boolean
        $tagIds: [Int]
      ) {
        updateQuestion(
          questionId: $questionId
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
    `,
  });
  return data;
};
