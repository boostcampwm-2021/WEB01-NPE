import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import UserRepository from "./UserRepository";

@EntityRepository(User)
export default class UserRepositoryImpl
  extends Repository<User>
  implements UserRepository
{
  public async findById(id: number): Promise<User> {
    const user = await this.findOne({ id });

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });

    return user;
  }
}
