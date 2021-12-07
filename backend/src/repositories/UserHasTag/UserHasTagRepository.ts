import { Repository } from "typeorm";
import { UserHasTag } from "../../entities/UserHasTag";

export default interface UserHasTagRepository extends Repository<UserHasTag> {
  findAllTagIdsByUserId(userId: number): Promise<UserHasTag[]>;
  findAllByUserId(userId: number): Promise<UserHasTag[]>;
}
