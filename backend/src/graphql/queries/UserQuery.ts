import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import UserService from "../services/UserService";
import UserType from "../types/UserType";
import Query from "./Query";

export default class UserQuery extends Query {
  type = new GraphQLList(UserType);
  args = {
    id: {
      type: GraphQLInt,
    },
    username: {
      type: GraphQLString,
    },
    score: {
      type: GraphQLInt,
    },
  };

  resolve = async (user, args) => {
    // 서비스 로직
    return await UserService.findAllUserByArgs(args);
  };
}
