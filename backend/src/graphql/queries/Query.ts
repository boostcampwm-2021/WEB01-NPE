import { GraphQLArgument, GraphQLList, GraphQLType } from "graphql";

export default class Query {
  private static instance: any;
  private static type: GraphQLType | GraphQLList<GraphQLType>;
  private static args: GraphQLArgument;
  private static resolve: Function;

  public static get(): any {
    if (!this.instance) {
      this.instance = {
        type: this.type,
        args: this.args,
        resolve: this.resolve,
      };
    }

    return this.instance;
  }
}
