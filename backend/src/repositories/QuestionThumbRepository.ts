import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { QuestionThumb } from "../entities/QuestionThumb";

@Service()
@EntityRepository(QuestionThumb)
export default class QuestionThumbRepository extends Repository<QuestionThumb> {
  public async deleteByQuestionId(questionId: number): Promise<void> {
    await this.delete({ postQuestionId: questionId });
  }

  public async exists(questionId: number, userId: number) {
    const thumb = await this.findOne({ postQuestionId: questionId, userId });

    if (thumb) return true;
    else return false;
  }
}
