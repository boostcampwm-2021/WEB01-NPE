import NoSuchUserError from "../../errors/NoSuchUserError";
import Container from "typedi";
import QuestionInput from "../../dto/QuestionInput";
import SearchQuestionInput from "../../dto/SearchQuestionInput";
import { PostQuestion } from "../../entities/PostQuestion";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import { UserHasTag } from "../../entities/UserHasTag";
import CommonError from "../../errors/CommonError";
import NoSuchQuestionError from "../../errors/NoSuchQuestionError";
import AnswerRepository from "../../repositories/Answer/AnswerRepository";
import PostQuestionHasTagRepository from "../../repositories/PostQuestionHasTag/PostQuestionHasTagRepository";
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

  public async search(
    searchQuery: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const { author, skip, take } = searchQuery;

    // 작성자 존재 확인
    if (author) {
      const user = this.userRepository.findByUsername(author);
      if (!user) {
        throw new NoSuchUserError("No Such User! Check Username");
      }
    }

    // where 조건 object 생성
    const whereObj = await this.questionRepository.buildWhereBySearchQuery(
      searchQuery
    );

    // 해당 조건들로 Repository에서 검색
    const questions = await this.questionRepository.findByArgs(
      whereObj,
      skip ?? 0,
      take ?? this.DEFALUT_TAKE_QUESTIONS_COUNT
    );

    return questions;
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

    return await this.questionRepository.saveOrUpdate(question);
  }

  public async getRank(): Promise<PostQuestion[]> {
    const questions = this.questionRepository.findAndOrderByThumbCountDesc(5);

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
        await this.postQuestionHasTagRepository.saveOrUpdate(
          postQuestionHasTag
        );

        // 유저-태그 관계
        let userHasTag = await this.userHasTagRepository.findByUserIdAndTagId(
          userId,
          tagId
        );
        if (!userHasTag) {
          userHasTag = new UserHasTag();
          userHasTag.userId = userId;
          userHasTag.tagId = tagId;
          userHasTag.count = 1;
        } else {
          userHasTag.count++;
        }
        await this.userHasTagRepository.saveOrUpdate(userHasTag);
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
      await this.postQuestionHasTagRepository.deleteByQuestionId(questionId);

      // 질문글-태그 관계
      for (const tagId of fieldsToUpdate.tagIds) {
        const tagEntity = new PostQuestionHasTag();
        tagEntity.postQuestion = updatedQuestion;
        tagEntity.tagId = tagId;
        await this.postQuestionHasTagRepository.saveOrUpdate(tagEntity);
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

    const count = await this.answerRepository.countByQuestionId(questionId);

    return count;
  }

  public async turnOffRealtimeShare(userId: number, questionId: number) {
    const question = await this.questionRepository.findById(questionId);

    if (question.userId !== userId)
      if (question.realtimeShare === 0)
        throw new CommonError("realtime share is already disabled");

    question.realtimeShare = 0;
    await this.questionRepository.saveOrUpdate(question);

    return true;
  }
}
