import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { QuestionThumb } from "../../entities/QuestionThumb";

export default interface QuestionThumbRepository {
  deleteByQuestionId(questionId: number): Promise<void>;
  exists(questionId: number, userId: number): Promise<boolean>;
}
