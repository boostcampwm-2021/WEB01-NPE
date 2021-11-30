import { User } from "../../entities/User";

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
