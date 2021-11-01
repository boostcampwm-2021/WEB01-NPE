import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "./PostQuestionType";
import PostAnswerType from "./PostAnswerType";

export default new GraphQLObjectType({
  name: "User",
  description:
    "유저 오브젝트 입니다. 하나의 오브젝트가 한 명(ID)의 유저입니다.",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
    score: {
      type: GraphQLInt,
    },
    profile_url: {
      type: GraphQLString,
    },
    social_url: {
      type: GraphQLString,
    },
    post_question: {
      type: new GraphQLList(PostQuestionType),
      resolve: async (user) => {
        return await PostService.findAllQuestionByArgs({ userId: user.id });
      },
    },
    post_answer: {
      type: new GraphQLList(PostAnswerType),
      resolve: async (user) => {
        return await PostService.findAllAnswerByArgs({ userId: user.id });
      },
    },
  }),
});
