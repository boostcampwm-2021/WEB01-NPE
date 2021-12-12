import { EntityRepository, Repository } from "typeorm";
import AnswerInput from "../../dto/AnswerInput";
import PostAnswer from "../../entities/PostAnswer";
import AnswerRepository from "./AnswerRepository";

@EntityRepository(PostAnswer)
export default class AnswerRepositoryImpl
  extends Repository<PostAnswer>
  implements AnswerRepository
{
  public async findById(answerId: number): Promise<PostAnswer> {
    const answer = await this.findOne({ id: answerId });

    return answer;
  }

  public async findAllByUserId(userId: number): Promise<PostAnswer[]> {
    const data = await this.find({ userId: userId });

    return data;
  }

  public async findAllByQuestionId(questionId: number): Promise<PostAnswer[]> {
    const data = await this.find({ postQuestionId: questionId });

    return data;
  }

  public async saveOrUpdate(entity: PostAnswer): Promise<PostAnswer> {
    return await this.save(entity);
  }

  public async modify(
    answerId: number,
    answerInput: AnswerInput
  ): Promise<PostAnswer> {
    const answer = await this.findById(answerId);
    answer.desc = answerInput.desc;

    return await this.save(answer);
  }

  public async deleteById(answerId: number): Promise<boolean> {
    const deleteResult = await this.delete({ id: answerId });

    return deleteResult.affected > 0;
  }

  public async countByQuestionId(questionId: number) {
    return await this.count({
      postQuestionId: questionId,
    });
  }
}
