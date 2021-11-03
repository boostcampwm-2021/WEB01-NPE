import {
  GraphQLFieldConfig,
  GraphQLFieldConfigArgumentMap,
  GraphQLInt,
  GraphQLOutputType,
  GraphQLString,
} from "graphql";
import UserService from "../services/UserService";
import UserType from "../types/UserType";
export default class UserQuery {
  private static instance: GraphQLFieldConfig<any, any, any>;
  private static type: GraphQLOutputType = UserType;

  private static args: GraphQLFieldConfigArgumentMap = {
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
  };

  private static resolve = async (_, args: GraphQLFieldConfigArgumentMap) => {
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
