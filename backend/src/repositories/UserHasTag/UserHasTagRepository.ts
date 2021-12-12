import "reflect-metadata";
import UserHasTag from "../../entities/UserHasTag";

export default interface UserHasTagRepository {
  findByUserId(userId: number): Promise<UserHasTag[]>;
  addNewRelations(userId: number, tagIds: number[]): Promise<UserHasTag[]>;
  increseAll(userId: number, tagIds: number[]): Promise<boolean>;
}
