import { createQueryBuilder, In, Like, SelectQueryBuilder } from "typeorm";
import { PostAnswer } from "../entities/PostAnswer";
import { PostQuestion } from "../entities/PostQuestion";
import { PostQuestionHasTag } from "../entities/PostQuestionHasTag";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { UserHasTag } from "../entities/UserHasTag";
import NoSuchQuestionError from "../errors/NoSuchQuestionError";
import AnswerInput from "../dto/AnswerInput";
import QuestionInput from "../dto/QuestionInput";
import SearchQuestionInput from "../dto/SearchQuestionInput";
import { Service } from "typedi";
import UserHasTagRepository from "../repositories/UserHasTagRepository";
import { InjectRepository } from "typeorm-typedi-extensions";
import PostQuestionHasTagRepository from "../repositories/PostQuestionHasTagRepostiory";

@Service()
export default class PostService {
  constructor(
    @InjectRepository()
    private readonly userHasTagRepository: UserHasTagRepository,
    @InjectRepository()
    private readonly postQuestionHasTagRepository: PostQuestionHasTagRepository
  ) {}

  private static DEFALUT_TAKE_QUESTIONS_COUNT = 20;
  public async findAllQuestionByArgs(
    args: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const { author, tagIDs, skip, take } = args;
    const { title, desc, realtimeShare } = args;

    const whereObj: Record<string, unknown> = {};

    if (realtimeShare) whereObj.realtimeShare = realtimeShare;
    if (title) whereObj.title = Like(`%${title}%`);
    if (desc) whereObj.desc = Like(`%${desc}%`);

    if (author) {
      const user = await User.findOne({ username: author });
      if (user) whereObj.userId = user.id;
      else return [];
    }

    function subQueryBuilderFromTagId(
      tagId: number,
      qb: SelectQueryBuilder<unknown>
    ) {
      return qb
        .subQuery()
        .from(Tag, "t")
        .select("t_q.post_question_id", "qid")
        .where(`t.id=${tagId}`)
        .leftJoin(PostQuestionHasTag, "t_q", "t.id=t_q.tag_id");
    }

    if (tagIDs && tagIDs.length) {
      let tagQueryBuilder = createQueryBuilder()
        .select("t0.qid")
        .from((qb) => subQueryBuilderFromTagId(tagIDs[0], qb), "t0");

      for (let i = 1; i < tagIDs.length; i++) {
        tagQueryBuilder.innerJoin(
          (qb) => subQueryBuilderFromTagId(tagIDs[i], qb),
          // alias
          `t${i}`,
          // ON
          `t0.qid=t${i}.qid`
        );
      }

      const qidArray = (await tagQueryBuilder.getRawMany()).map(
        (qid) => qid.qid
      );
      whereObj.id = In(qidArray);
    }

    const builder = PostQuestion.createQueryBuilder()
      .where(whereObj)
      .skip(skip ?? 0)
      .take(take ?? PostService.DEFALUT_TAKE_QUESTIONS_COUNT)
      .orderBy("id", "DESC");

    const rows = await builder.getMany();
    return rows;
  }

  public async findAllQuestionByUserId(
    userId: number
  ): Promise<PostQuestion[]> {
    const questions = await PostQuestion.find({ userId });

    return questions;
  }

  public async findAllAnswerByUserId(userId: number): Promise<PostAnswer[]> {
    const data = await PostAnswer.find({ userId });
    return data;
  }

  public async findAllAnswerByQuestionId(id: number): Promise<PostAnswer[]> {
    const data = await PostAnswer.find({ postQuestionId: id });

    return data;
  }

  public async findOneQuestionById(id: number): Promise<PostQuestion> {
    const question = await PostQuestion.findOne({ id: id });

    if (!question) throw new NoSuchQuestionError("Check ID");

    return question;
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
    await newQuestion.save();

    const author = await User.findOne({ id: user.id });
    if (args.tagIds && args.tagIds.length > 0) {
      for (const tagId of args.tagIds) {
        const postQuestionHasTag = new PostQuestionHasTag();
        postQuestionHasTag.postQuestion = newQuestion;
        postQuestionHasTag.tagId = tagId;
        this.postQuestionHasTagRepository.create(postQuestionHasTag);

        // 유저 개인의 태그 저장
        let userHasTag = await this.userHasTagRepository.findOne({
          userId: user.id,
          tagId: tagId,
        });
        if (!userHasTag) {
          userHasTag = new UserHasTag();
          userHasTag.user = author;
          userHasTag.tagId = tagId;
          userHasTag.count = 0;
        } else {
          userHasTag.count++;
        }

        this.userHasTagRepository.save(userHasTag);
      }
    }

    return newQuestion;
  }

  public async updateQuestion(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ) {
    const partialQuestion: PostQuestion = new PostQuestion();
    const originQuestion = await PostQuestion.findOne({ id: questionId });
    partialQuestion.id = questionId;
    partialQuestion.userId = originQuestion.userId;
    partialQuestion.title = fieldsToUpdate.title;
    partialQuestion.desc = fieldsToUpdate.desc;
    partialQuestion.realtimeShare = fieldsToUpdate.realtimeShare ? 1 : 0;

    if (fieldsToUpdate.tagIds && fieldsToUpdate.tagIds.length > 0) {
      await PostQuestionHasTag.delete({ postQuestionId: questionId });

      for (const tagId of fieldsToUpdate.tagIds) {
        const tagEntity = new PostQuestionHasTag();
        tagEntity.postQuestion = partialQuestion;
        tagEntity.tagId = tagId;
        this.postQuestionHasTagRepository.save(tagEntity);
      }
    }

    return await PostQuestion.save(partialQuestion);
  }

  public async deleteQuestion(questionId: number): Promise<boolean> {
    const result = await PostQuestion.delete({ id: questionId });

    if (result.affected > 0) return true;
    else return false;
  }

  public async addNewAnswer(
    args: AnswerInput, // 이후 ctx.user 로 수정
    userId: number,
    questionId: number
  ): Promise<PostAnswer> {
    const question = await PostQuestion.findOne(
      { id: questionId },
      {
        select: ["id", "userId"],
      }
    );
    const newAnswer = new PostAnswer();
    newAnswer.postQuestionId = question.id;
    newAnswer.postQuestionUserId = question.userId;
    newAnswer.userId = userId;
    newAnswer.desc = args.desc;

    return await newAnswer.save();
  }

  public async findOneAnswerById(answerId: number): Promise<PostAnswer> {
    const answer = await PostAnswer.findOne({ id: answerId });

    return answer;
  }

  public async updateAnswer(
    answerId: number,
    answerInput: AnswerInput
  ): Promise<PostAnswer> {
    const answer = await PostAnswer.findOne({ id: answerId });
    answer.desc = answerInput.desc;

    return await PostAnswer.save(answer);
  }

  public async deleteAnswer(answerId: number): Promise<boolean> {
    const deleteResult = await PostAnswer.delete({ id: answerId });

    return deleteResult.affected > 0;
  }
}