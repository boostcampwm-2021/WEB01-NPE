import { EntityRepository, Repository } from "typeorm";
import { PostQuestion } from "../entities/PostQuestion";
import NoSuchQuestionError from "../graphql/errors/NoSuchQuestionError";
import QuestionInput from "../graphql/inputTypes/QuestionInput";

@EntityRepository()
export default class QuestionRepository extends Repository<PostQuestion> {
  public async addNewQuestion(
    args: QuestionInput,
    // 이후 ctx.user 로 수정
    user: { id: number }
  ): Promise<PostQuestion> {
    const newQuestion = new PostQuestion();
    newQuestion.userId = user.id;
    newQuestion.title = args.title;
    newQuestion.desc = args.desc;
    newQuestion.realtimeShare = args.realtimeShare ? 1 : 0;
    await newQuestion.save();

    // const author = await User.findOne({ id: user.id });
    // if (args.tagIds && args.tagIds.length > 0) {
    //   for (const tagId of args.tagIds) {
    //     const postQuestionHasTag = new PostQuestionHasTag();
    //     postQuestionHasTag.postQuestion = newQuestion;
    //     postQuestionHasTag.tagId = tagId;
    //     await postQu ddfestionHasTag.save();

    //     // 유저 개인의 태그 저장
    //     let userHasTag = await UserHasTag.findOne({
    //       userId: user.id,
    //       tagId: tagId,
    //     });
    //     if (!userHasTag) {
    //       userHasTag = new UserHasTag();
    //       userHasTag.user = author;
    //       userHasTag.tagId = tagId;
    //       userHasTag.count = 0;
    //     } else {
    //       userHasTag.count++;
    //     }

    //     await userHasTag.save();
    //   }
    // }

    return newQuestion;
  }
  public async findAllQuestionByUserId(
    userId: number
  ): Promise<PostQuestion[]> {
    const questions = await this.find({ userId });

    return questions;
  }

  public async findOneQuestionById(id: number): Promise<PostQuestion> {
    const question = await this.findOne({ id });

    if (!question) throw new NoSuchQuestionError("Check ID");

    return question;
  }

  public async deleteQuestion(questionId: number): Promise<boolean> {
    const result = await this.delete({ id: questionId });

    if (result.affected > 0) return true;
    else return false;
  }
}
