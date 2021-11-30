import { EntityRepository, Repository } from "typeorm";
import AnswerInput from "../../dto/AnswerInput";
import { PostAnswer } from "../../entities/PostAnswer";
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
    const data = await this.findAllByUserId(userId);

    return data;
  }

  public async findAllByQuestionId(questionId: number): Promise<PostAnswer[]> {
    const data = await this.findAllByQuestionId(questionId);

    return data;
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
}
