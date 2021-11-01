import { getConnection } from "typeorm";
import { User } from "../../entities/User";

export default class UserService {
  public static async findAllUserByArgs(args): Promise<User[]> {
    const data = await User.find(args);

    return data;
  }
}
