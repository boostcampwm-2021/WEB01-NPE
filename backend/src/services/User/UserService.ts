import { Container, Service } from "typedi";
import { User } from "../../entities/User";
import UserRepository from "../../repositories/User/UserRepository";

export default interface UserService {
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
  register(
    id: number,
    username: string,
    profileUrl: string,
    socialUrl: string
  ): Promise<User>;
  getRank(): Promise<User[]>;
}
