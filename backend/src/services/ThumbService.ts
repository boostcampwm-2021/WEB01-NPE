import { Service } from "typedi";
import { getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { QuestionThumb } from "../entities/QuestionThumb";
import { AnswerThumb } from "../entities/AnswerThumb";
import AnswerRepository from "../repositories/AnswerRepository";
import AnswerThumbRepository from "../repositories/AnswerThumbRepository";
import QuestionRepository from "../repositories/QuestionRepository";
import QuestionThumbRepository from "../repositories/QuestionThumbRepository";

@Service()
export default class ThumbService {
  constructor(
    @InjectRepository()
    private readonly questionThumbRepository: QuestionThumbRepository,
    @InjectRepository()
    private readonly questionRepository: QuestionRepository,
    @InjectRepository()
    private readonly answerRepository: AnswerRepository,
    @InjectRepository()
    private readonly answerThumbRepository: AnswerThumbRepository
  ) {}

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

    const newThumbUp = new QuestionThumb();
    newThumbUp.postQuestionId = questionId;
    newThumbUp.userId = userId;
    newThumbUp.value = 1;

    const question = await this.questionRepository.findById(questionId);
    question.thumbupCount++;

    await getConnection()
      .transaction("REPEATABLE READ", async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newThumbUp);
        await transactionalEntityManager.save(question);
      })
      .catch((error) => {
        throw error;
      });
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

    const newThumbDown = new QuestionThumb();
    newThumbDown.postQuestionId = questionId;
    newThumbDown.userId = userId;
    newThumbDown.value = -1;

    const question = await this.questionRepository.findById(questionId);
    question.thumbupCount--;

    await getConnection()
      .transaction("REPEATABLE READ", async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newThumbDown);
        await transactionalEntityManager.save(question);
      })
      .catch((error) => {
        throw error;
      });
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

    const newThumbUp = new AnswerThumb();
    newThumbUp.postAnswerId = answerId;
    newThumbUp.userId = userId;
    newThumbUp.value = 1;

    const answer = await this.answerRepository.findById(answerId);
    answer.thumbupCount++;

    await getConnection()
      .transaction("REPEATABLE READ", async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newThumbUp);
        await transactionalEntityManager.save(answer);
      })
      .catch((error) => {
        throw error;
      });
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

    const newThumbDown = new AnswerThumb();
    newThumbDown.postAnswerId = answerId;
    newThumbDown.userId = userId;
    newThumbDown.value = -1;

    const answer = await this.answerRepository.findById(answerId);
    answer.thumbupCount--;

    await getConnection()
      .transaction("REPEATABLE READ", async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newThumbDown);
        await transactionalEntityManager.save(answer);
      })
      .catch((error) => {
        throw error;
      });
    return true;
  }
}
