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

  public static async addNewUser(
    id: number,
    username: string,
    profileUrl: string,
    socialUrl: string
  ): Promise<User> {
    const newUser = new User();
    newUser.id = id;
    newUser.username = username;
    newUser.profileUrl = profileUrl;
    newUser.socialUrl = socialUrl;
    await newUser.save();

    return newUser;
  }
}
