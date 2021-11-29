import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { AnswerThumb } from "../entities/AnswerThumb";

@Service()
@EntityRepository(AnswerThumb)
export default class AnswerThumbRepository extends Repository<AnswerThumb> {
  public async deleteByAnswerId(answerId: number): Promise<void> {
    await this.delete({ postAnswerId: answerId });
  }

  public async exists(answerId: number, userId: number) {
    const thumb = await this.findOne({ postAnswerId: answerId, userId });

    if (thumb) return true;
    else return false;
  }
}
