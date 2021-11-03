import {
  GraphQLInt,
  GraphQLOutputType,
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";
export default class QuestionQuery {
  private static instance: GraphQLFieldConfig<any, any, any>;
  private static type: GraphQLOutputType = PostQuestionType;

  private static args: GraphQLFieldConfigArgumentMap = {
    id: {
      type: GraphQLInt,
    },
  };

  private static resolve = async (_, args: GraphQLFieldConfigArgumentMap) => {
    const data = await PostService.findOneQuestionById(args.id);

    return data;
  };

  public static get() {
    if (!QuestionQuery.instance) {
      QuestionQuery.instance = {
        type: QuestionQuery.type,
        args: QuestionQuery.args,
        resolve: QuestionQuery.resolve,
      };
    }

    return QuestionQuery.instance;
  }
}
