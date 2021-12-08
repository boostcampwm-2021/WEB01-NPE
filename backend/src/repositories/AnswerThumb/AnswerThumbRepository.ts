import { AnswerThumb } from "@src/entities/AnswerThumb";

export default interface AnswerThumbRepository {
  deleteByAnswerId(answerId: number): Promise<void>;
  addNew(value: 1 | -1, answerId: number, userId: number): Promise<AnswerThumb>;
  exists(answerId: number, userId: number): Promise<boolean>;
}
