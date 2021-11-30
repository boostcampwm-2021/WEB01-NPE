import "reflect-metadata";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

export default interface UserRepository extends Repository<User> {
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
}

@EntityRepository(User)
export class UserRepositoryImpl
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
