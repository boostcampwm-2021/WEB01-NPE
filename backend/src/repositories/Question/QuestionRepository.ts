import { PostQuestion } from "../../entities/PostQuestion";
import QuestionInput from "../../dto/QuestionInput";
import SearchQuestionInput from "@src/dto/SearchQuestionInput";

export default interface QuestionRepository {
  addNew(args: QuestionInput, userId: number): Promise<PostQuestion>;
  deleteById(questionId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<PostQuestion[]>;
  findById(id: number): Promise<PostQuestion>;
  modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ): Promise<PostQuestion>;
  saveOrUpdate(question: PostQuestion): Promise<PostQuestion>;
  findAndOrderByThumbCountDesc(take: number): Promise<PostQuestion[]>;
  findByArgs(
    where: object,
    skip: number,
    take: number
  ): Promise<PostQuestion[]>;
  buildWhereBySearchQuery(
    searchQuery: SearchQuestionInput
  ): Promise<Record<string, unknown>>;
}
