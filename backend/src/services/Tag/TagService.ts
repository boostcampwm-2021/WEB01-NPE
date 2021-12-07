import { UserHasTag } from "@src/entities/UserHasTag";
import { Tag } from "../../entities/Tag";

export default interface TagService {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  findByIds(ids: number[]): Promise<Tag[]>;
  findByName(name: string): Promise<Tag>;
  findAllIdsByQuestionId(questionId: number): Promise<number[]>;
  findAllByUserId(userId: number): Promise<UserHasTag[]>;
}
