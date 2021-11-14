import { EntityRepository, Repository } from "typeorm";
import { PostAnswer } from "../entities/PostAnswer";
import AnswerInput from "../graphql/inputTypes/AnswerInput";

@EntityRepository()
export default class AnswerRepository extends Repository<PostAnswer> {
  public async findOneAnswerById(answerId: number): Promise<PostAnswer> {
    const answer = await this.findOne({ id: answerId });

    return answer;
  }

  public async addNewAnswer(
    args: AnswerInput, // 이후 ctx.user 로 수정
    user: { id: number },
    questionId: number
  ): Promise<PostAnswer> {
    const question = await this.findOne(
      { id: questionId },
      {
        select: ["id", "userId"],
      }
    );
    const newAnswer = new PostAnswer();
    newAnswer.postQuestionId = question.id;
    newAnswer.postQuestionUserId = question.userId;
    newAnswer.userId = user.id;
    newAnswer.desc = args.desc;

    return await newAnswer.save();
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
