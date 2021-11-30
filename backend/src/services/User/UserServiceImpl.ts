import Container from "typedi";
import { User } from "../../entities/User";
import UserRepository from "../../repositories/User/UserRepository";
import UserService from "./UserService";

export default class UserServiceImpl implements UserService {
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

  public async getRank(): Promise<User[]> {
    const users = this.userRepository.find({
      take: 5,
      order: { score: "DESC" },
    });

    return users;
  }
}
