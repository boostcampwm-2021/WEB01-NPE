import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import UserType from "./UserType";
import UserService from "../services/UserService";

export default new GraphQLObjectType({
  name: "PostAnswer",
  description:
    "답변글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 답변을 의미합니다.",
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
    user: {
      type: UserType,
      resolve: async (answer) => {
        const user = await UserService.findOneUserByArgs({
          id: answer.userId,
        });

        return user;
      },
    },
  }),
});
