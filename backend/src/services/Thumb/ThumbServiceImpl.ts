import Container from "typedi";
import AnswerRepository from "../../repositories/Answer/AnswerRepository";
import AnswerThumbRepository from "../../repositories/AnswerThumb/AnswerThumbRepository";
import QuestionRepository from "../../repositories/Question/QuestionRepository";
import QuestionThumbRepository from "../../repositories/QuestionThumb/QuestionThumbRepository";

export default class ThumbServiceImpl {
  private readonly questionThumbRepository: QuestionThumbRepository;
  private readonly questionRepository: QuestionRepository;
  private readonly answerRepository: AnswerRepository;
  private readonly answerThumbRepository: AnswerThumbRepository;

  constructor() {
    this.questionThumbRepository = Container.get("QuestionThumbRepository");
    this.questionRepository = Container.get("QuestionRepository");
    this.answerRepository = Container.get("AnswerRepository");
    this.answerThumbRepository = Container.get("AnswerThumbRepository");
  }

  public async questionThumbUp(
    questionId: number,
    userId: number
  ): Promise<boolean> {
    // 이미 좋아요 혹은 싫어요 했는지 확인
    const alreadyExists = await this.questionThumbRepository.exists(
      questionId,
      userId
    );
    if (alreadyExists) return false;

    await this.questionThumbRepository.addNew(1, questionId, userId);

    const question = await this.questionRepository.findById(questionId);
    question.thumbupCount++;
    await this.questionRepository.saveOrUpdate(question);

    return true;
  }

  public async questionThumbDown(
    questionId: number,
    userId: number
  ): Promise<boolean> {
    const alreadyExists = await this.questionThumbRepository.exists(
      questionId,
      userId
    );
    if (alreadyExists) return false;

    await this.questionThumbRepository.addNew(-1, questionId, userId);

    const question = await this.questionRepository.findById(questionId);
    question.thumbupCount--;
    await this.questionRepository.saveOrUpdate(question);

    return true;
  }

  public async answerThumbUp(
    answerId: number,
    userId: number
  ): Promise<boolean> {
    const alreadyExists = await this.answerThumbRepository.exists(
      answerId,
      userId
    );
    if (alreadyExists) return false;

    await this.answerThumbRepository.addNew(1, answerId, userId);

    const answer = await this.answerRepository.findById(answerId);
    answer.thumbupCount++;
    await this.answerRepository.saveOrUpdate(answer);

    return true;
  }

  public async answerThumbDown(
    answerId: number,
    userId: number
  ): Promise<boolean> {
    const alreadyExists = await this.answerThumbRepository.exists(
      answerId,
      userId
    );
    if (alreadyExists) return false;

    await this.answerThumbRepository.addNew(-1, answerId, userId);

    const answer = await this.answerRepository.findById(answerId);
    answer.thumbupCount--;
    await this.answerRepository.saveOrUpdate(answer);

    return true;
  }
}
