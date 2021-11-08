import { User } from "../../entities/User";

export default class UserService {
  public static async findOneUserById(id: number): Promise<User> {
    const user = await User.findOne(id);

    return user;
  }

  public static async findOneUserByUsername(username: string): Promise<User> {
    const user = await User.findOne(username);

    return user;
  }
}
