import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";

export default new GraphQLInputObjectType({
  name: "PostQuestionInput",
  description:
    "질문글에 대한 인풋 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
  fields: () => ({
    title: {
      type: GraphQLString,
    },
    desc: {
      type: GraphQLString,
    },
    realtime_share: {
      type: GraphQLBoolean,
    },
    score: {
      type: GraphQLInt,
      defaultValue: 0,
    },
  }),
});
