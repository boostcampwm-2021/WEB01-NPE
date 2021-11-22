import { EntityRepository, getRepository, Repository } from "typeorm";
import { PostQuestion } from "../entities/PostQuestion";
import { PostQuestionHasTag } from "../entities/PostQuestionHasTag";
import { UserHasTag } from "../entities/UserHasTag";
import NoSuchQuestionError from "../errors/NoSuchQuestionError";
import QuestionInput from "../dto/QuestionInput";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import PostQuestionHasTagRepository from "./PostQuestionHasTagRepostiory";
import UserHasTagRepository from "./UserHasTagRepository";

@Service()
@EntityRepository(PostQuestion)
export default class QuestionRepository extends Repository<PostQuestion> {
  constructor(
    @InjectRepository()
    private readonly postQuestionHasTagRepository: PostQuestionHasTagRepository,
    @InjectRepository()
    private readonly userHasTagRepository: UserHasTagRepository
  ) {
    super();
  }

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
    await this.save(newQuestion);

    if (args.tagIds && args.tagIds.length > 0) {
      for (const tagId of args.tagIds) {
        const postQuestionHasTag = new PostQuestionHasTag();
        postQuestionHasTag.postQuestion = newQuestion;
        postQuestionHasTag.tagId = tagId;
        this.postQuestionHasTagRepository.save(postQuestionHasTag);

        // 유저 개인의 태그 저장
        let userHasTag = await this.userHasTagRepository.findOne({
          userId: user.id,
          tagId: tagId,
        });
        if (!userHasTag) {
          userHasTag = new UserHasTag();
          userHasTag.userId = user.id;
          userHasTag.tagId = tagId;
          userHasTag.count = 0;
        } else {
          userHasTag.count++;
        }

        await this.userHasTagRepository.save(userHasTag);
      }
    }

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

  public async updateQuestion(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ) {
    const partialQuestion: PostQuestion = new PostQuestion();
    const originQuestion = await this.findOneQuestionById(questionId);
    partialQuestion.id = questionId;
    partialQuestion.userId = originQuestion.userId;
    partialQuestion.title = fieldsToUpdate.title;
    partialQuestion.desc = fieldsToUpdate.desc;
    partialQuestion.realtimeShare = fieldsToUpdate.realtimeShare ? 1 : 0;

    if (fieldsToUpdate.tagIds && fieldsToUpdate.tagIds.length > 0) {
      await this.postQuestionHasTagRepository.delete({
        postQuestionId: questionId,
      });

      for (const tagId of fieldsToUpdate.tagIds) {
        const tagEntity = new PostQuestionHasTag();
        tagEntity.postQuestion = partialQuestion;
        tagEntity.tagId = tagId;
        this.postQuestionHasTagRepository.save(tagEntity);
      }
    }

    return await this.save(partialQuestion);
  }
}
