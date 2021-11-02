import { Like } from "typeorm";
import { PostAnswer } from "../../entities/PostAnswer";
import { PostQuestion } from "../../entities/PostQuestion";

export default class PostService {
  private static DEFALUT_TAKE_QUESTIONS_COUNT = 20;
  public static async findAllQuestionByArgs(args): Promise<PostQuestion[]> {
    const { author, tags, skip, take } = args;
    const { title, desc, realtime_share } = args;

    const whereObj: any = {};

    if (realtime_share) whereObj.realtimeShare = realtime_share;
    if (title) whereObj.title = Like(`%${title}%`);
    if (desc) whereObj.desc = Like(`%${desc}%`);

    const data = await PostQuestion.find({
      order: {
        createdAt: "DESC",
      },
      skip: skip ?? 0,
      take: take ?? this.DEFALUT_TAKE_QUESTIONS_COUNT,
      where: whereObj,
    });

    return data;
  }

  public static async findAllAnswerByArgs(args): Promise<PostAnswer[]> {
    const data = await PostAnswer.find(args);

    return data;
  }

  public static async findOneQuestionById(id): Promise<PostQuestion> {
    const question = await PostQuestion.findOneOrFail({ id: id });

    return question;
  }
}
