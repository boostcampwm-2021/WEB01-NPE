import { User } from "../../entities/User";
import { createConnection } from "typeorm";

export default class UserService {
  public static async findAllUserByArgs(args): Promise<User[]> {
    const connection = await createConnection();
    const data = await User.find(args);
    connection.close();

    return data;
  }
}
