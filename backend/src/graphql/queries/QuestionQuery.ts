import {
  GraphQLInt,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";
export default class QuestionQuery
  implements GraphQLFieldConfig<any, any, any>
{
  type = PostQuestionType;

  args = {
    id: {
      type: GraphQLInt,
      description: "해당 질문글의 ID",
    },
  };

  description = "단일 질문글을 ID를 통해 조회하는 쿼리";

  resolve = async (src, args, context) => {
    const data = await PostService.findOneQuestionById(args.id);

    return data;
  };
}
