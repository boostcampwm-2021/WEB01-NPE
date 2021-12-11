import { ThumbValue } from "@src/entities/abstract/Thumb";
import AnswerThumb from "@src/entities/AnswerThumb";

export default interface AnswerThumbRepository {
  deleteByAnswerId(answerId: number): Promise<void>;
  addNew(
    value: ThumbValue,
    answerId: number,
    userId: number
  ): Promise<AnswerThumb>;
  exists(answerId: number, userId: number): Promise<boolean>;
}
