import "reflect-metadata";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";

export default interface UserRepository extends Repository<User> {
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
}
