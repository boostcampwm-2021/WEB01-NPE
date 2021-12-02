import { UserHasTag } from "entities/UserHasTag";
import { Tag } from "../../entities/Tag";

export default interface TagService {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  findByIds(ids: number[]): Promise<Tag[]>;
  findByName(name: string): Promise<Tag>;
  findAllIdsByQuestionId(questionId: number): Promise<number[]>;
  findAllIdsByUserId(userId: number): Promise<UserHasTag[]>;
}
