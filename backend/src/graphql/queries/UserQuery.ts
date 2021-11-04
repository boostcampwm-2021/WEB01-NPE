import {
  GraphQLFieldConfig,
  GraphQLFieldResolver,
  GraphQLInt,
  GraphQLString,
} from "graphql";
import UserService from "../services/UserService";
import UserType from "../types/UserType";
export default class UserQuery implements GraphQLFieldConfig<any, any, any> {
  type = UserType;

  args = {
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
  };

  resolve = async (src, args, context) => {
    const data = await UserService.findOneUserByArgs(args);

    return data;
  };
}
