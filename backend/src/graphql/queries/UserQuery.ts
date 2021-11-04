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
      description: "유저의 ID",
    },
    username: {
      type: GraphQLString,
      description: "유저명",
    },
  };

  description = "단일 유저 조회 쿼리. id혹은 username중 하나만 사용";

  resolve = async (src, args, context) => {
    const data = await UserService.findOneUserByArgs(args);

    return data;
  };
}
