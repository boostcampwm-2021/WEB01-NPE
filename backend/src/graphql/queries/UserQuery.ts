import { GraphQLInt, GraphQLList, GraphQLString, GraphQLType } from "graphql";
import UserService from "../services/UserService";
import UserType from "../types/UserType";
export default class UserQuery {
  private static instance: any;
  private static type: GraphQLType | GraphQLList<GraphQLType> = UserType;

  private static args: object = {
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
  };

  private static resolve = async (_, args) => {
    const data = await UserService.findOneUserByArgs(args);

    return data;
  };

  public static get() {
    if (!UserQuery.instance) {
      UserQuery.instance = {
        type: UserQuery.type,
        args: UserQuery.args,
        resolve: UserQuery.resolve,
      };
    }

    return UserQuery.instance;
  }
}
