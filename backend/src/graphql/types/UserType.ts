import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "./PostQuestionType";

export default new GraphQLObjectType({
  name: "User",
  description: "This is UserType",
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
  }),
});
