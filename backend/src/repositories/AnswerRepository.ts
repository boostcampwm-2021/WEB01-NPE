import { EntityRepository, Repository } from "typeorm";
import { PostAnswer } from "../entities/PostAnswer";
import AnswerInput from "../dto/AnswerInput";
import { Service } from "typedi";

@Service()
@EntityRepository(PostAnswer)
export default class AnswerRepository extends Repository<PostAnswer> {
  public async findOneAnswerById(answerId: number): Promise<PostAnswer> {
    const answer = await this.findOne({ id: answerId });

    return answer;
  }

  public async findAllAnswerByUserId(userId: number): Promise<PostAnswer[]> {
    const data = await this.find({ userId });

    return data;
  }

  public async findAllAnswerByQuestionId(id: number): Promise<PostAnswer[]> {
    const data = await this.find({ postQuestionId: id });

    return data;
  }

  public async updateAnswer(
    answerId: number,
    answerInput: AnswerInput
  ): Promise<PostAnswer> {
    const answer = await this.findOne({ id: answerId });
    answer.desc = answerInput.desc;

    return await this.save(answer);
  }

  public async deleteAnswer(answerId: number): Promise<boolean> {
    const deleteResult = await this.delete({ id: answerId });

    return deleteResult.affected > 0;
  }
}
