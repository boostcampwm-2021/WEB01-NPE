import Container, { Service } from "typedi";
import { EntityRepository, MoreThan, Repository } from "typeorm";
import { UserHasTag } from "../entities/UserHasTag";

@Service()
@EntityRepository(UserHasTag)
export default class UserHasTagRepository extends Repository<UserHasTag> {
  public async findAllByUserId(userId: number): Promise<UserHasTag[]> {
    const data = await this.find({
      where: { userId, count: MoreThan(0) },
      relations: ["tag"],
    });

    return data;
  }
}
