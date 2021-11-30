import { Service } from "typedi";
import { EntityRepository, MoreThan, Repository } from "typeorm";
import { UserHasTag } from "../entities/UserHasTag";

export default interface UserHasTagRepository extends Repository<UserHasTag> {
  findAllByUserId(userId: number): Promise<UserHasTag[]>;
}

@EntityRepository(UserHasTag)
export class UserHasTagRepositoryImpl extends Repository<UserHasTag> {
  public async findAllByUserId(userId: number): Promise<UserHasTag[]> {
    const data = await this.find({
      where: { userId, count: MoreThan(0) },
      relations: ["tag"],
    });

    return data;
  }
}
