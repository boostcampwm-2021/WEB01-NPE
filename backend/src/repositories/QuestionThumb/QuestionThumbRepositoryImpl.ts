import { ThumbValue } from "@src/entities/abstract/Thumb";
import { EntityRepository, Repository } from "typeorm";
import QuestionThumb from "../../entities/QuestionThumb";
import QuestionThumbRepository from "./QuestionThumbRepository";

@EntityRepository(QuestionThumb)
export default class QuestionThumbRepositoryImpl
  extends Repository<QuestionThumb>
  implements QuestionThumbRepository
{
  public async deleteByQuestionId(questionId: number): Promise<void> {
    await this.delete({ postQuestionId: questionId });
  }

  public async exists(questionId: number, userId: number) {
    const thumb = await this.findOne({ postQuestionId: questionId, userId });

    if (thumb) return true;
    else return false;
  }

  public async addNew(
    value: ThumbValue,
    questionId: number,
    userId: number
  ): Promise<QuestionThumb> {
    const newThumb = new QuestionThumb();
    newThumb.postQuestionId = questionId;
    newThumb.userId = userId;
    newThumb.value = value;
    return await this.save(newThumb);
  }
}
