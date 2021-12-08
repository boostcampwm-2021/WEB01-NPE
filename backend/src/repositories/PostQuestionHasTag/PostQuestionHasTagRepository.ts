import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";

export default interface PostQuestionHasTagRepository {
  saveOrUpdate(entity: PostQuestionHasTag): Promise<PostQuestionHasTag>;
  deleteByQuestionId(questionId: number): Promise<boolean>;
  findAllTagIdsByQuestionId(questionId: number): Promise<number[]>;
}
