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
      description: "유저의 고유 ID",
    },
    username: {
      type: GraphQLString,
      description: "유저명",
    },
    score: {
      type: GraphQLInt,
      description: "누적 점수. 등급/랭킹 산정에 사용",
    },
    profile_url: {
      type: GraphQLString,
      description: "프로필 URL",
    },
    social_url: {
      type: GraphQLString,
      description: "소셜 URL",
    },
    post_question: {
      type: new GraphQLList(PostQuestionType),
      description: "해당 유저가 작성한 질문글 Object",
      resolve: async (user) => {
        return await PostService.findAllQuestionByArgs({ userId: user.id });
      },
    },
    post_answer: {
      type: new GraphQLList(PostAnswerType),
      description: "해당 유저가 작성한 답변글 Object",
      resolve: async (user) => {
        return await PostService.findAllAnswerByArgs({ userId: user.id });
      },
    },
  }),
});
