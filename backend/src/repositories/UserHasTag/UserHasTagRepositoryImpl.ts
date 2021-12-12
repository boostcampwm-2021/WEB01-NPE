import UserHasTag from "../../entities/UserHasTag";
import { EntityRepository, In, Repository } from "typeorm";
import UserHasTagRepository from "./UserHasTagRepository";

@EntityRepository(UserHasTag)
export default class UserHasTagRepositoryImpl
  extends Repository<UserHasTag>
  implements UserHasTagRepository
{
  public async findByUserId(userId: number): Promise<UserHasTag[]> {
    return await this.find({ userId });
  }

  public async addNewRelations(
    userId: number,
    tagIds: number[]
  ): Promise<UserHasTag[]> {
    const entities: UserHasTag[] = tagIds.map((tagId) => {
      const entity = new UserHasTag();
      entity.userId = userId;
      entity.tagId = tagId;

      return entity;
    });

    return await this.save(entities);
  }

  public async increseAll(userId: number, tagIds: number[]): Promise<boolean> {
    await this.createQueryBuilder()
      .update(UserHasTag)
      .where({ userId: userId, tagId: In(tagIds) })
      .set({ count: () => "count + 1" })
      .execute();

    return true;
  }
}
