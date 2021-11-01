import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import PostAnswerType from "./PostAnswerType";
import UserType from "./UserType";

export default new GraphQLObjectType({
  name: "PostQuestion",
  description:
    "질문글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    user_id: {
      type: GraphQLInt,
      resolve: (question) => question.userId,
    },
    title: {
      type: GraphQLString,
    },
    desc: {
      type: GraphQLString,
    },
    view_count: {
      type: GraphQLInt,
      resolve: (question) => question.viewCount,
    },
    thumbup_count: {
      type: GraphQLInt,
      resolve: (question) => question.thumbupCount,
    },
    realtime_share: {
      type: GraphQLBoolean,
      resolve: (question) => question.realtimeShare,
    },
    created_at: {
      type: GraphQLString,
      resolve: (question) => question.createdAt.toString(),
    },
    score: {
      type: GraphQLInt,
      resolve: (question) => question.score ?? 0,
    },
    user: {
      type: UserType,
      resolve: async (question) => {
        const user = await UserService.findOneUserByArgs({
          id: question.userId,
        });

        return user;
      },
    },
    question_answer: {
      type: new GraphQLList(PostAnswerType),
      resolve: async (question) => {
        const answers = await PostService.findAllAnswerByArgs({
          postQuestionId: question.id,
        });
        return answers;
      },
    },
  }),
});
