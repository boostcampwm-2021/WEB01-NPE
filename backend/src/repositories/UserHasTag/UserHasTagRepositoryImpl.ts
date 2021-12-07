import { EntityRepository, MoreThan, Repository } from "typeorm";
import { UserHasTag } from "../../entities/UserHasTag";
import UserHasTagRepository from "./UserHasTagRepository";

@EntityRepository(UserHasTag)
export default class UserHasTagRepositoryImpl
  extends Repository<UserHasTag>
  implements UserHasTagRepository
{
  public async findAllTagIdsByUserId(userId: number): Promise<UserHasTag[]> {
    const relationRows = await this.find({
      where: { userId: userId },
    });

    return relationRows;
  }

  public async findAllByUserId(userId: number): Promise<UserHasTag[]> {
    const data = await this.find({
      where: { userId, count: MoreThan(0) },
      relations: ["tag"],
    });

    return data;
  }
}
