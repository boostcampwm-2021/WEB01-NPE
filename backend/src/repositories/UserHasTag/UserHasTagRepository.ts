import { Service } from "typedi";
import { EntityRepository, MoreThan, Repository } from "typeorm";
import { UserHasTag } from "../../entities/UserHasTag";

export default interface UserHasTagRepository extends Repository<UserHasTag> {
  findAllByUserId(userId: number): Promise<UserHasTag[]>;
}
