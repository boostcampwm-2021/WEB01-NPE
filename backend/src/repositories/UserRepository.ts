import "reflect-metadata";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@Service()
@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findById(id: number): Promise<User> {
    const user = await this.findOne({ id });

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });

    return user;
  }
}
