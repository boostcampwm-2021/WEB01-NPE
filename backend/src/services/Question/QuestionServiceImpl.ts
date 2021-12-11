import NoSuchUserError from "../../errors/NoSuchUserError";
import Container from "typedi";
import QuestionInput from "../../dto/QuestionInput";
import SearchQuestionInput from "../../dto/SearchQuestionInput";
import PostQuestion from "../../entities/PostQuestion";
import CommonError from "../../errors/CommonError";
import NoSuchQuestionError from "../../errors/NoSuchQuestionError";
import AnswerRepository from "../../repositories/Answer/AnswerRepository";
import QuestionRepository from "../../repositories/Question/QuestionRepository";
import QuestionThumbRepository from "../../repositories/QuestionThumb/QuestionThumbRepository";
import UserRepository from "../../repositories/User/UserRepository";
import QuestionService from "./QuestionService";
import AuthenticationError from "../../errors/AuthenticationError";
import TagRepository from "@src/repositories/Tag/TagRepository";

export default class QuestionServiceImpl implements QuestionService {
  private readonly userRepository: UserRepository;
  private readonly questionRepository: QuestionRepository;
  private readonly answerRepository: AnswerRepository;
  private readonly questionThumbRepository: QuestionThumbRepository;
  private readonly tagRepository: TagRepository;

  constructor() {
    this.userRepository = Container.get("UserRepository");
    this.answerRepository = Container.get("AnswerRepository");
    this.questionRepository = Container.get("QuestionRepository");
    this.questionThumbRepository = Container.get("QuestionThumbRepository");
    this.tagRepository = Container.get("TagRepository");
  }

  public async search(
    searchQuery: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const { author } = searchQuery;

    // 작성자 존재 확인
    if (author) {
      const user = await this.userRepository.findByUsername(author);
      if (!user) {
        throw new NoSuchUserError("No Such User! Check Username");
      }
    }

    return await this.questionRepository.findByArgs(searchQuery);
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
    const question = await this.findById(id);

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
    const tags = args.tagIds.length
      ? await this.tagRepository.findByIds(args.tagIds)
      : [];
    const newQuestion = await this.questionRepository.addNew(
      args,
      tags,
      userId
    );

    // 유저-태그 관계

    return newQuestion;
  }

  public async modify(
    questionId: number,
    fieldsToUpdate: QuestionInput,
    userId: number
  ) {
    const question = await this.questionRepository.findById(questionId);
    if (question.userId !== userId)
      throw new AuthenticationError("not your post!");

    const tags = fieldsToUpdate.tagIds.length
      ? await this.tagRepository.findByIds(fieldsToUpdate.tagIds)
      : [];
    const updatedQuestion = await this.questionRepository.modify(
      questionId,
      fieldsToUpdate,
      tags
    );

    // 유저-태그 관계

    return updatedQuestion;
  }

  public async delete(questionId: number): Promise<boolean> {
    const result = await this.questionRepository.deleteById(questionId);
    await this.questionThumbRepository.deleteByQuestionId(questionId);

    return result;
  }

  public async getAnswerCount(questionId: number): Promise<number> {
    const count = await this.answerRepository.countByQuestionId(questionId);

    return count;
  }

  public async turnOffRealtimeShare(userId: number, questionId: number) {
    const question = await this.questionRepository.findById(questionId);

    if (question.userId !== userId)
      throw new AuthenticationError("not your question!");

    if (question.realtimeShare === false)
      throw new CommonError("realtime share is already disabled");

    question.realtimeShare = true;
    await this.questionRepository.saveOrUpdate(question);

    return true;
  }
}
