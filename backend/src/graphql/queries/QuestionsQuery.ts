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
    },
    desc: {
      type: GraphQLString,
    },
    tagIDs: {
      type: new GraphQLList(GraphQLInt),
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

  resolve = async (_, args: GraphQLFieldConfigArgumentMap) => {
    return await PostService.findAllQuestionByArgs(args);
  };
}
