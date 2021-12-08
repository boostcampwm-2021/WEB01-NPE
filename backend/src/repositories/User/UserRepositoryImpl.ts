import UserDto from "@src/dto/UserDto";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../../entities/User";
import UserRepository from "./UserRepository";

@EntityRepository(User)
export default class UserRepositoryImpl
  extends Repository<User>
  implements UserRepository
{
  public async findById(id: number): Promise<User> {
    const user = await this.findOne({ id });

    return user;
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });

    return user;
  }

  public async saveOrUpdate(user: User): Promise<User> {
    return await this.save(user);
  }

  public async addNew(userDto: UserDto): Promise<User> {
    const newUser = new User();
    newUser.id = userDto.id;
    newUser.username = userDto.username;
    newUser.profileUrl = userDto.profileUrl;
    newUser.socialUrl = userDto.socialUrl;

    return await this.save(newUser);
  }

  public async findAndOrderByScoreDesc(take: number): Promise<User[]> {
    return await this.find({ take, order: { score: "DESC" } });
  }
}
