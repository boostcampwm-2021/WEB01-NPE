import UserDto from "@src/dto/UserDto";
import { User } from "../../entities/User";

export default interface UserService {
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
  register(userDto: UserDto): Promise<User>;
  getRank(): Promise<User[]>;
}
