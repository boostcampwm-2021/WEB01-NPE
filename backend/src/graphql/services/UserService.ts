import { User } from "../../entities/User";

export default class UserService {
  public static async findAllUserById(args): Promise<User[]> {
    const data = await User.find(args);

    return data;
  }

  public static async findOneUserById(id: number): Promise<User> {
    const user = await User.findOne(id);

    return user;
  }

  public static async findOneUserByUsername(username: string): Promise<User> {
    const user = await User.findOne(username);

    return user;
  }

  public static async findOneUserByArgs(args): Promise<User> {
    const user = await User.findOne(args);

    return user;
  }
}
