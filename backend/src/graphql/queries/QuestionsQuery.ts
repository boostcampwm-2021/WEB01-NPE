import {
  GraphQLInt,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";
export default class QuestionsQuery
  implements GraphQLFieldConfig<any, any, any>
{
  type = GraphQLList(PostQuestionType);

  args = {
    title: {
      type: GraphQLString,
      description: "제목에 포함하는 문자열",
    },
    desc: {
      type: GraphQLString,
      description: "내용에 포함하는 문자열",
    },
    tagIDs: {
      type: new GraphQLList(GraphQLInt),
      description: "포함해야 하는 태그 ID",
    },
    realtime_share: {
      type: GraphQLBoolean,
      description: "실시간 공유 여부",
    },
    author: {
      type: GraphQLString,
      description: "작성자 닉네임",
    },
    skip: {
      type: GraphQLInt,
      description: "넘길 질문글 개수. 페이징에 사용",
    },
    take: {
      type: GraphQLInt,
      description: "가져올 질문글 개수. 페이징에 사용",
    },
  };

  description = "다수의 질문글을 검색하는 쿼리";

  resolve = async (_, args: GraphQLFieldConfigArgumentMap) => {
    return await PostService.findAllQuestionByArgs(args);
  };
}
