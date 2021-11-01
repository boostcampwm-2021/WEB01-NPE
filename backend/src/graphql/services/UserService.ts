import { User } from "../../entities/User";

export default class UserService {
  public static async findAllUserByArgs(args): Promise<User[]> {
    const data = await User.find(args);

    return data;
  }

  public static async findOneUserByArgs(args): Promise<User> {
    const user = await User.findOneOrFail(args);

    return user;
  }
}
