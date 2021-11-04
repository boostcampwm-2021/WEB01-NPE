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
      description: "해당 답변글의 고유 ID",
    },
    user_id: {
      type: GraphQLInt,
      description: "해당 답변글 작성자의 ID",
      resolve: (answer) => answer.userId,
    },
    desc: {
      type: GraphQLString,
      description: "해당 답변글의 내용",
    },
    thumbup_count: {
      type: GraphQLInt,
      description: "해당 답변글의 좋아요 개수",
      resolve: (answer) => answer.thumbupCount,
    },
    created_at: {
      type: GraphQLString,
      description: "해당 답변글의 생성 시각",
      resolve: (answer) => answer.createdAt.toString(),
    },
    state: {
      type: GraphQLInt,
      description: "해당 답변글의 상태(미구현)",
    },
    user: {
      type: UserType,
      description: "해당 작성글 작성자의 User Object",
      resolve: async (answer) => {
        const user = await UserService.findOneUserByArgs({
          id: answer.userId,
        });

        return user;
      },
    },
  }),
});
