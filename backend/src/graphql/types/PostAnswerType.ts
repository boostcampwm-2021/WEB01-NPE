import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Post_answer",
  description: "This is Post(answer)",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    user_id: {
      type: GraphQLInt,
      resolve: (answer) => answer.userId,
    },
    desc: {
      type: GraphQLString,
    },
    thumbup_count: {
      type: GraphQLInt,
      resolve: (answer) => answer.thumbupCount,
    },
    created_at: {
      type: GraphQLString,
      resolve: (answer) => answer.createdAt.toString(),
    },
    state: {
      type: GraphQLInt,
    },
  }),
});
