import { GraphQLInt, GraphQLList, GraphQLString, GraphQLType } from "graphql";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";
export default class QuestionQuery {
  private static instance: any;
  private static type: GraphQLType | GraphQLList<GraphQLType> =
    PostQuestionType;

  private static args: object = {
    id: {
      type: GraphQLInt,
    },
  };

  private static resolve = async (_, args) => {
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
