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
    },
  };

  resolve = async (src, args, context) => {
    const data = await PostService.findOneQuestionById(args.id);

    return data;
  };
}
