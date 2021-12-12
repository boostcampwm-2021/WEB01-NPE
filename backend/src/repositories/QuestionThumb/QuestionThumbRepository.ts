import { ThumbValue } from "@src/entities/abstract/Thumb";
import QuestionThumb from "@src/entities/QuestionThumb";

export default interface QuestionThumbRepository {
  deleteByQuestionId(questionId: number): Promise<void>;
  addNew(
    value: ThumbValue,
    questionId: number,
    userId: number
  ): Promise<QuestionThumb>;
  exists(questionId: number, userId: number): Promise<boolean>;
}
