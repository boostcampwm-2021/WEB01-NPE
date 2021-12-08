import UserDto from "@src/dto/UserDto";
import "reflect-metadata";
import { User } from "../../entities/User";

export default interface UserRepository {
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
  addNew(user: UserDto): Promise<User>;
  saveOrUpdate(user: User): Promise<User>;
  findAndOrderByScoreDesc(take: number): Promise<User[]>;
}
