import { EntityRepository, getRepository, MoreThan, Repository } from "typeorm";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { UserHasTag } from "../entities/UserHasTag";

@EntityRepository(UserHasTag)
export default class UserHasTagRepository extends Repository<UserHasTag> {
  private readonly userRepository = getRepository(User);
  private readonly tagRepository = getRepository(Tag);

  public async getAllTagsUsedByUserByUserId(
    userId: number
  ): Promise<UserHasTag[]> {
    const data = await this.find({
      where: { userId, count: MoreThan(0) },
      relations: ["tag"],
    });

    return data;
  }
}
