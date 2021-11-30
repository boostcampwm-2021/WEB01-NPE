import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { AnswerThumb } from "../entities/AnswerThumb";

export default interface AnswerThumbRepository {
  deleteByAnswerId(answerId: number): Promise<void>;
  exists(answerId: number, userId: number): Promise<boolean>;
}

@EntityRepository(AnswerThumb)
export class AnswerThumbRepositoryImpl
  extends Repository<AnswerThumb>
  implements AnswerThumbRepository
{
  public async deleteByAnswerId(answerId: number): Promise<void> {
    await this.delete({ postAnswerId: answerId });
  }

  public async exists(answerId: number, userId: number) {
    const thumb = await this.findOne({ postAnswerId: answerId, userId });

    if (thumb) return true;
    else return false;
  }
}
