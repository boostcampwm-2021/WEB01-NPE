import { UserHasTag } from "../../entities/UserHasTag";

export default interface UserHasTagRepository {
  findAllTagIdsByUserId(userId: number): Promise<UserHasTag[]>;
  findAllByUserId(userId: number): Promise<UserHasTag[]>;
  findByUserIdAndTagId(userId: number, tagId: number): Promise<UserHasTag>;
  saveOrUpdate(userHasTag: UserHasTag): Promise<UserHasTag>;
}
