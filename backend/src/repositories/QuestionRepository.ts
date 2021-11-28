import { EntityRepository, Repository } from "typeorm";
import { PostQuestion } from "../entities/PostQuestion";
import NoSuchQuestionError from "../errors/NoSuchQuestionError";
import QuestionInput from "../dto/QuestionInput";
import { Service } from "typedi";

export default interface QuestionRepository extends Repository<PostQuestion> {
  addNew(args: QuestionInput, userId: number): Promise<PostQuestion>;
  deleteById(questionId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<PostQuestion[]>;
  findById(id: number): Promise<PostQuestion>;
  modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ): Promise<PostQuestion>;
}

@Service()
@EntityRepository(PostQuestion)
export class QuestionRepositoryImpl
  extends Repository<PostQuestion>
  implements QuestionRepository
{
  public async addNew(
    args: QuestionInput,
    userId: number
  ): Promise<PostQuestion> {
    const newQuestion = new PostQuestion();
    newQuestion.userId = userId;
    newQuestion.title = args.title;
    newQuestion.desc = args.desc;
    newQuestion.realtimeShare = args.realtimeShare ? 1 : 0;
    return await this.save(newQuestion);
  }

  public async findAllByUserId(userId: number): Promise<PostQuestion[]> {
    const questions = await this.find({ userId });

    return questions;
  }

  public async findById(id: number): Promise<PostQuestion> {
    const question = await this.findOne({ id });

    if (!question) throw new NoSuchQuestionError("Check ID");

    return question;
  }

  public async deleteById(questionId: number): Promise<boolean> {
    const result = await this.delete({ id: questionId });

    if (result.affected > 0) return true;
    else return false;
  }

  public async modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ) {
    const partialQuestion: PostQuestion = new PostQuestion();
    const originQuestion = await this.findById(questionId);
    partialQuestion.id = questionId;
    partialQuestion.userId = originQuestion.userId;
    partialQuestion.title = fieldsToUpdate.title;
    partialQuestion.desc = fieldsToUpdate.desc;
    partialQuestion.realtimeShare = fieldsToUpdate.realtimeShare ? 1 : 0;

    return await this.save(partialQuestion);
  }
}
