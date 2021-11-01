import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "User",
  description: "This is UserType",
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (user) => user.id,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    score: {
      type: GraphQLInt,
      resolve: (user) => user.score,
    },
    profile_url: {
      type: GraphQLString,
      resolve: (user) => user.profile_url,
    },
    social_url: {
      type: GraphQLString,
      resolve: (user) => user.social_url,
    },
  }),
});
