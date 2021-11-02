import {
  GraphQLInt,
  GraphQLString,
  GraphQLFieldConfig,
  GraphQLArgumentConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLInputObjectType,
  GraphQLOutputType,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";
export default class QuestionsQuery {
  private static instance: GraphQLFieldConfig<any, any, any>;
  private static type: GraphQLOutputType = GraphQLList(PostQuestionType);

  private static args: GraphQLFieldConfigArgumentMap = {
    title: {
      type: GraphQLString,
    },
    desc: {
      type: GraphQLString,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    realtime_share: {
      type: GraphQLBoolean,
    },
    author: {
      type: GraphQLString,
    },
    skip: {
      type: GraphQLInt,
    },
    take: {
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
