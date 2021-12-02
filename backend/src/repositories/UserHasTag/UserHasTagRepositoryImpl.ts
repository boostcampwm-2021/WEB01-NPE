import { EntityRepository, MoreThan, Repository } from "typeorm";
import { UserHasTag } from "../../entities/UserHasTag";

@EntityRepository(UserHasTag)
export default class UserHasTagRepositoryImpl extends Repository<UserHasTag> {
  public async findAllByUserId(userId: number): Promise<UserHasTag[]> {
    const data = await this.find({
      where: { userId, count: MoreThan(0) },
      relations: ["tag"],
    });

    return data;
  }
}
