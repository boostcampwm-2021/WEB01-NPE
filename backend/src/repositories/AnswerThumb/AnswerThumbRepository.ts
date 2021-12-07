import { AnswerThumb } from "@src/entities/AnswerThumb";
import { Repository } from "typeorm";

export default interface AnswerThumbRepository extends Repository<AnswerThumb> {
  deleteByAnswerId(answerId: number): Promise<void>;
  addNew(value: 1 | -1, answerId: number, userId: number): Promise<AnswerThumb>;
  exists(answerId: number, userId: number): Promise<boolean>;
}
