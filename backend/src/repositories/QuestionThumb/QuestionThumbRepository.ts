import { QuestionThumb } from "@src/entities/QuestionThumb";

export default interface QuestionThumbRepository {
  deleteByQuestionId(questionId: number): Promise<void>;
  addNew(
    value: 1 | -1,
    questionId: number,
    userId: number
  ): Promise<QuestionThumb>;
  exists(questionId: number, userId: number): Promise<boolean>;
}
