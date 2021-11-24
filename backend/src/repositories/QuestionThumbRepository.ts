import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { QuestionThumb } from "../entities/QuestionThumb";

@Service()
@EntityRepository(QuestionThumb)
export default class QuestionThumbRepository extends Repository<QuestionThumb> {
  public async deleteByQuestionId(answerId: number): Promise<void> {
    await this.delete({ postQuestionId: answerId });
  }
}
