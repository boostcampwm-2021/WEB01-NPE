import Container from "typedi";
import { createQueryBuilder, In, Like, SelectQueryBuilder } from "typeorm";
import QuestionInput from "../../dto/QuestionInput";
import SearchQuestionInput from "../../dto/SearchQuestionInput";
import { PostQuestion } from "../../entities/PostQuestion";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import { Tag } from "../../entities/Tag";
import { UserHasTag } from "../../entities/UserHasTag";
import CommonError from "../../errors/CommonError";
import NoSuchQuestionError from "../../errors/NoSuchQuestionError";
import AnswerRepository from "../../repositories/Answer/AnswerRepository";
import PostQuestionHasTagRepository from "../../repositories/PostQuestionHasTag/PostQuestionHasTagRepostiory";
import QuestionRepository from "../../repositories/Question/QuestionRepository";
import QuestionThumbRepository from "../../repositories/QuestionThumb/QuestionThumbRepository";
import UserRepository from "../../repositories/User/UserRepository";
import UserHasTagRepository from "../../repositories/UserHasTag/UserHasTagRepository";
import QuestionService from "./QuestionService";

export default class QuestionServiceImpl implements QuestionService {
  private readonly userRepository: UserRepository;
  private readonly userHasTagRepository: UserHasTagRepository;
  private readonly questionRepository: QuestionRepository;
  private readonly postQuestionHasTagRepository: PostQuestionHasTagRepository;
  private readonly answerRepository: AnswerRepository;
  private readonly questionThumbRepository: QuestionThumbRepository;
  private readonly DEFALUT_TAKE_QUESTIONS_COUNT: number;

  constructor() {
    this.userRepository = Container.get("UserRepository");
    this.userHasTagRepository = Container.get("UserHasTagRepository");
    this.postQuestionHasTagRepository = Container.get(
      "PostQuestionHasTagRepository"
    );
    this.answerRepository = Container.get("AnswerRepository");
    this.questionRepository = Container.get("QuestionRepository");
    this.questionThumbRepository = Container.get("QuestionThumbRepository");
    this.DEFALUT_TAKE_QUESTIONS_COUNT =
      Container.get<number>("DEFALUT_TAKE_QUESTIONS_COUNT") ?? 5;
  }

  public async search(args: SearchQuestionInput): Promise<PostQuestion[]> {
    const { author, tagIDs, skip, take } = args;
    const { title, desc, realtimeShare } = args;

    const whereObj: Record<string, unknown> = {};

    if (realtimeShare) whereObj.realtimeShare = realtimeShare;
    if (title) whereObj.title = Like(`%${title}%`);
    if (desc) whereObj.desc = Like(`%${desc}%`);

    if (author) {
      const user = await this.userRepository.findByUsername(author);
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

    const builder = this.questionRepository
      .createQueryBuilder()
      .where(whereObj)
      .skip(skip ?? 0)
      .take(take ?? this.DEFALUT_TAKE_QUESTIONS_COUNT)
      .orderBy("id", "DESC");

    const rows = await builder.getMany();
    return rows;
  }

  public async findAllByUserId(userId: number): Promise<PostQuestion[]> {
    const questions = await this.questionRepository.findAllByUserId(userId);

    return questions;
  }

  public async findById(id: number): Promise<PostQuestion> {
    const question = await this.questionRepository.findById(id);

    if (!question) throw new NoSuchQuestionError("Check ID");

    return question;
  }

  public async viewById(id: number): Promise<PostQuestion> {
    const question = await this.questionRepository.findById(id);

    if (!question) throw new NoSuchQuestionError("Check ID");
    question.viewCount++;

    return await this.questionRepository.save(question);
  }

  public async getRank(): Promise<PostQuestion[]> {
    const questions = this.questionRepository.find({
      take: 5,
      order: { thumbupCount: "DESC" },
    });

    return questions;
  }

  public async addNew(
    args: QuestionInput,
    userId: number
  ): Promise<PostQuestion> {
    const newQuestion = await this.questionRepository.addNew(args, userId);

    // 태그 존재하는지
    if (args.tagIds && args.tagIds.length > 0) {
      for (const tagId of args.tagIds) {
        // 질문글-태그 관계
        const postQuestionHasTag = new PostQuestionHasTag();
        postQuestionHasTag.postQuestion = newQuestion;
        postQuestionHasTag.tagId = tagId;
        await this.postQuestionHasTagRepository.save(postQuestionHasTag);

        // 유저-태그 관계
        let userHasTag = await this.userHasTagRepository.findOne({
          userId: userId,
          tagId: tagId,
        });
        if (!userHasTag) {
          userHasTag = new UserHasTag();
          userHasTag.userId = userId;
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

  public async update(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ) {
    const updatedQuestion = await this.questionRepository.modify(
      questionId,
      fieldsToUpdate
    );

    // 태그 여부 확인
    if (fieldsToUpdate.tagIds && fieldsToUpdate.tagIds.length > 0) {
      // 기존 태그 삭제
      await this.postQuestionHasTagRepository.delete({
        postQuestionId: questionId,
      });

      // 질문글-태그 관계
      for (const tagId of fieldsToUpdate.tagIds) {
        const tagEntity = new PostQuestionHasTag();
        tagEntity.postQuestion = updatedQuestion;
        tagEntity.tagId = tagId;
        await this.postQuestionHasTagRepository.save(tagEntity);
      }
    }

    return updatedQuestion;
  }

  public async delete(questionId: number): Promise<boolean> {
    const result = await this.questionRepository.deleteById(questionId);
    await this.questionThumbRepository.deleteByQuestionId(questionId);

    return result;
  }

  public async getAnswerCount(questionId: number): Promise<number> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) throw new NoSuchQuestionError();

    const count = await this.answerRepository.count({
      postQuestionId: questionId,
    });

    return count;
  }

  public async turnOffRealtimeShare(userId: number, questionId: number) {
    const question = await this.questionRepository.findById(questionId);

    if (question.userId !== userId)
      if (question.realtimeShare === 0)
        throw new CommonError("realtime share is already disabled");

    question.realtimeShare = 0;
    await this.questionRepository.save(question);

    return true;
  }
}
