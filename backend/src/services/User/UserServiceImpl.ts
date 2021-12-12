import UserDto from "@src/dto/UserDto";
import Container from "typedi";
import User from "../../entities/User";
import UserRepository from "../../repositories/User/UserRepository";
import UserService from "./UserService";

export default class UserServiceImpl implements UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = Container.get("UserRepository");
  }

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  public async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByUsername(username);
  }

  public async register(userDto: UserDto): Promise<User> {
    return await this.userRepository.addNew(userDto);
  }

  public async getRank(): Promise<User[]> {
    return await this.userRepository.findAndOrderByScoreDesc(5);
  }
}
