import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/User";
import UserRepository from "../repositories/UserRepository";

@Service()
export default class UserService {
  constructor(
    @InjectRepository()
    private readonly userRepository: UserRepository
  ) {}
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
}
