import { Repository } from "typeorm";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";

export default interface PostQuestionHasTagRepository
  extends Repository<PostQuestionHasTag> {
  findAllTagIdsByQuestionId(questionId: number): Promise<number[]>;
}
