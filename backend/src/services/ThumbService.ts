import { Service } from "typedi";
import { getConnection } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { QuestionThumb } from "../entities/QuestionThumb";
import QuestionRepository from "../repositories/QuestionRepository";
import QuestionThumbRepository from "../repositories/QuestionThumbRepository";

@Service()
export default class ThumbService {
  constructor(
    @InjectRepository()
    private readonly questionThumb: QuestionThumbRepository,
    @InjectRepository()
    private readonly questionRepository: QuestionRepository
  ) {}

  public async questionThumbUp(
    questionId: number,
    userId: number
  ): Promise<boolean> {
    const alreadyExists = await this.questionThumb.findOne({
      postQuestionId: questionId,
      userId: userId,
    });
    if (alreadyExists) return false;

    const newThumbUp = new QuestionThumb();
    newThumbUp.postQuestionId = questionId;
    newThumbUp.userId = userId;
    newThumbUp.value = 1;

    const question = await this.questionRepository.findOneQuestionById(
      questionId
    );
    question.thumbupCount++;

    await getConnection()
      .transaction("SERIALIZABLE", async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newThumbUp);
        await transactionalEntityManager.save(question);
      })
      .catch((error) => {
        throw error;
      });
    return true;
  }
}
