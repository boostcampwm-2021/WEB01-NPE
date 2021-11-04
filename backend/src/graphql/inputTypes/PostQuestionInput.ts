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
      description: "제목",
    },
    desc: {
      type: GraphQLString,
      description: "내용",
    },
    realtime_share: {
      type: GraphQLBoolean,
      description: "실시간 공유 여부",
    },
    score: {
      type: GraphQLInt,
      defaultValue: 0,
      description: "채택시 지급할 점수",
    },
  }),
});
