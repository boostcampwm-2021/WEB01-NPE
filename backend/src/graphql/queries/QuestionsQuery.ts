import {
  GraphQLInt,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLArgumentConfig,
  GraphQLOutputType,
  GraphQLFieldConfigArgumentMap,
  GraphQLInputObjectType,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";
export default class QuestionsQuery {
  private static instance: GraphQLFieldConfig<any, any, any>;
  private static type: GraphQLOutputType = PostQuestionType;

  private static args: GraphQLFieldConfigArgumentMap = {
    user_id: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    limit: {
      type: GraphQLInt,
    },
  };

  private static resolve = async (_, args: GraphQLFieldConfigArgumentMap) => {
    return await PostService.findAllQuestionByArgs(args);
  };

  public static get() {
    if (!QuestionsQuery.instance) {
      QuestionsQuery.instance = {
        type: QuestionsQuery.type,
        args: QuestionsQuery.args,
        resolve: QuestionsQuery.resolve,
      };
    }

    return QuestionsQuery.instance;
  }
}
