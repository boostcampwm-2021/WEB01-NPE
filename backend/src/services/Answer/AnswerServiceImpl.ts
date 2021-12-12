import Container from "typedi";
import AnswerInput from "../../dto/AnswerInput";
import PostAnswer from "../../entities/PostAnswer";
import AnswerRepository from "../../repositories/Answer/AnswerRepository";
import AnswerThumbRepository from "../../repositories/AnswerThumb/AnswerThumbRepository";
import QuestionRepository from "../../repositories/Question/QuestionRepository";
import UserRepository from "../../repositories/User/UserRepository";
import AnswerService from "./AnswerService";

export default class AnswerServiceImpl implements AnswerService {
  private readonly userRepository: UserRepository;
  private readonly questionRepository: QuestionRepository;
  private readonly answerRepository: AnswerRepository;
  private readonly answerThumbRepository: AnswerThumbRepository;

  constructor() {
    this.userRepository = Container.get("UserRepository");
    this.answerRepository = Container.get("AnswerRepository");
    this.questionRepository = Container.get("QuestionRepository");
    this.answerThumbRepository = Container.get("AnswerThumbRepository");
  }

  public async findAllByUserId(userId: number): Promise<PostAnswer[]> {
    const data = await this.answerRepository.findAllByUserId(userId);
    return data;
  }

  public async findAllByQuestionId(questionId: number): Promise<PostAnswer[]> {
    const data = await this.answerRepository.findAllByQuestionId(questionId);

    return data;
  }

  public async addNew(
    args: AnswerInput,
    userId: number,
    questionId: number
  ): Promise<PostAnswer> {
    const question = await this.questionRepository.findById(questionId);
    const newAnswer = new PostAnswer();
    newAnswer.postQuestionId = question.id;
    newAnswer.postQuestionUserId = question.userId;
    newAnswer.userId = userId;
    newAnswer.desc = args.desc;

    const author = await this.userRepository.findById(userId);
    author.score += 10;
    await this.userRepository.saveOrUpdate(author);

    return await this.answerRepository.saveOrUpdate(newAnswer);
  }

  public async findById(answerId: number): Promise<PostAnswer> {
    const answer = await this.answerRepository.findById(answerId);

    return answer;
  }

  public async modify(
    answerId: number,
    answerInput: AnswerInput
  ): Promise<PostAnswer> {
    const answer = await this.answerRepository.findById(answerId);
    answer.desc = answerInput.desc;

    return await this.answerRepository.saveOrUpdate(answer);
  }

  public async delete(answerId: number): Promise<boolean> {
    await this.answerRepository.deleteById(answerId);
    await this.answerThumbRepository.deleteByAnswerId(answerId);

    return true;
  }

  public async adopt(answerId: number): Promise<boolean> {
    const answer = await this.answerRepository.findById(answerId);
    const answerAuthor = await this.userRepository.findById(answer.userId);
    const question = await this.questionRepository.findById(
      answer.postQuestionId
    );

    question.adopted = true;
    await this.questionRepository.saveOrUpdate(question);

    answer.state = 1;
    await this.answerRepository.saveOrUpdate(answer);

    answerAuthor.score += 50;
    await this.userRepository.saveOrUpdate(answerAuthor);

    return true;
  }
}
