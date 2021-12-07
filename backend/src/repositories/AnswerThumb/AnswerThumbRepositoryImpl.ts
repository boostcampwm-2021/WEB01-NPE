import { QuestionThumb } from "@src/entities/QuestionThumb";
import { EntityRepository, Repository } from "typeorm";
import { AnswerThumb } from "../../entities/AnswerThumb";
import AnswerThumbRepository from "./AnswerThumbRepository";

@EntityRepository(AnswerThumb)
export default class AnswerThumbRepositoryImpl
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

  public async addNew(
    value: 1 | -1,
    answerId: number,
    userId: number
  ): Promise<AnswerThumb> {
    const newThumb = new AnswerThumb();
    newThumb.postAnswerId = answerId;
    newThumb.userId = userId;
    newThumb.value = value;
    return await this.save(newThumb);
  }
}
