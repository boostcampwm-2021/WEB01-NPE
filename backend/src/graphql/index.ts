import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, graphql } from "graphql";
import { buildSchema } from "type-graphql";
import QuestionMutation from "./mutations/QuestionMutation";
import QuestionQuery from "./queries/QuestionQuery";
import QuestionsQuery from "./queries/QuestionsQuery";
import TagQuery from "./queries/TagQuery";
import TagsQuery from "./queries/TagsQuery";
import UserQuery from "./queries/UserQuery";
import UserResolver from "./resolvers/UserResolver";

export default class GraphQLMiddleware {
  private static schema: GraphQLSchema;

  public static async get() {
    if (!this.schema) {
      // this.schema = new GraphQLSchema({
      //   query: this.RootQuery,
      //   mutation: this.RootMutation,
      // });
      const schema = await buildSchema({
        resolvers: [UserResolver],
      });

      this.schema = schema;
    }

    return graphqlHTTP({
      schema: this.schema,
      graphiql: true,
    });
  }

  private static RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "RootQuery",
    description: "최상단 GrpahQL Query(읽기와 관련된 API) 진입 경로입니다.",
    fields: () => ({
      user: new UserQuery(),
      post_question: new QuestionQuery(),
      post_questions: new QuestionsQuery(),
      tag: new TagQuery(),
      tags: new TagsQuery(),
    }),
  });

  private static RootMutation: GraphQLObjectType = new GraphQLObjectType({
    name: "RootMutation",
    description:
      "최상단 GraphQL Mutation(쓰기,수정,삭제와 관련된 API) 진입 경로입니다.",
    fields: () => ({
      question: new QuestionMutation(),
    }),
  });
}
