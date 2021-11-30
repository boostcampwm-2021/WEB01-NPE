import { Container, Service } from "typedi";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

export default interface UserService {
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
  register(
    id: number,
    username: string,
    profileUrl: string,
    socialUrl: string
  ): Promise<User>;
  getUsersRank(): Promise<User[]>;
}

export class UserServiceImpl implements UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = Container.get("UserRepository");
  }

  public async findById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);

    return user;
  }

  public async register(
    id: number,
    username: string,
    profileUrl: string,
    socialUrl: string
  ): Promise<User> {
    const newUser = new User();
    newUser.id = id;
    newUser.username = username;
    newUser.profileUrl = profileUrl;
    newUser.socialUrl = socialUrl;
    await this.userRepository.save(newUser);

    return newUser;
  }

  public async getUsersRank(): Promise<User[]> {
    const users = this.userRepository.find({
      take: 5,
      order: { score: "DESC" },
    });

    return users;
  }
}
