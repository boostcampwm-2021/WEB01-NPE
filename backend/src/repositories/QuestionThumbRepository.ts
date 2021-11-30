import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { QuestionThumb } from "../entities/QuestionThumb";

export default interface QuestionThumbRepository {
  deleteByQuestionId(questionId: number): Promise<void>;
  exists(questionId: number, userId: number): Promise<boolean>;
}

@EntityRepository(QuestionThumb)
export class QuestionThumbRepositoryImpl extends Repository<QuestionThumb> {
  public async deleteByQuestionId(questionId: number): Promise<void> {
    await this.delete({ postQuestionId: questionId });
  }

  public async exists(questionId: number, userId: number) {
    const thumb = await this.findOne({ postQuestionId: questionId, userId });

    if (thumb) return true;
    else return false;
  }
}
