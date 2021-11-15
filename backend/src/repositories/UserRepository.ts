import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findOneUserById(id: number): Promise<User> {
    const user = await this.findOne({ id });

    return user;
  }

  public async findOneUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });

    return user;
  }
}
