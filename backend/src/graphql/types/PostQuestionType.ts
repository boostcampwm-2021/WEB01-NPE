import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PostService from "../services/PostService";
import PostanswerType from "./PostanswerType";

export default new GraphQLObjectType({
  name: "Post_question",
  description: "This is Post(question)",
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
    post_answer: {
      type: new GraphQLList(PostanswerType),
      resolve: async (question) => {
        const answers = await PostService.findAllAnswerByArgs({
          postQuestionId: question.id,
        });
        return answers;
      },
    },
  }),
});
