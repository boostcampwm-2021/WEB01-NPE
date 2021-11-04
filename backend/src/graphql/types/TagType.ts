import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Tag",
  description: "태그 오브젝트 입니다.",
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: "태그의 고유 ID",
    },
    name: {
      type: GraphQLString,
      description: "태그의 이름",
    },
  }),
});
