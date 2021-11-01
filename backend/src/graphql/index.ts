import { graphqlHTTP } from "express-graphql";
import { GraphQLSchema, GraphQLObjectType, graphql } from "graphql";
import UserQuery from "./queries/UserQuery";

export default class GraphQLMiddleware {
  private static schema: GraphQLSchema;

  public static get(): any {
    if (!this.schema) {
      this.schema = new GraphQLSchema({
        query: this.RootQuery,
      });
    }

    return graphqlHTTP({
      schema: this.schema,
      graphiql: true,
    });
  }

  private static RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "rootQuery",
    description: "최상단 GrpahQL Query(읽기와 관련된 API) 진입 경로입니다.",
    fields: () => ({
      user: UserQuery.get(),
    }),
  });
}