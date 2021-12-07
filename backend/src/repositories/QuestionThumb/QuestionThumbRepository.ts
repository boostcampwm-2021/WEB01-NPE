import { QuestionThumb } from "@src/entities/QuestionThumb";
import { Repository } from "typeorm";

export default interface QuestionThumbRepository
  extends Repository<QuestionThumb> {
  deleteByQuestionId(questionId: number): Promise<void>;
  addNew(
    value: 1 | -1,
    questionId: number,
    userId: number
  ): Promise<QuestionThumb>;
  exists(questionId: number, userId: number): Promise<boolean>;
}
