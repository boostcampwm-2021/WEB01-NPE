import { FindOperator, Like } from "typeorm";
import { PostAnswer } from "../../entities/PostAnswer";
import { PostQuestion } from "../../entities/PostQuestion";
import { User } from "../../entities/User";

export default class PostService {
  private static DEFALUT_TAKE_QUESTIONS_COUNT = 20;
  public static async findAllQuestionByArgs(args): Promise<PostQuestion[]> {
    const { author, tagIDs, skip, take } = args;
    const { title, desc, realtime_share } = args;

    const whereObj: Record<string, number | FindOperator<string>> = {};

    if (realtime_share) whereObj.realtimeShare = realtime_share;
    if (title) whereObj.title = Like(`%${title}%`);
    if (desc) whereObj.desc = Like(`%${desc}%`);

    if (author) {
      const user = await User.findOne({ username: author });
      if (user) whereObj.userId = user.id;
      else return [];
    }

    const builder = PostQuestion.createQueryBuilder("Question")
      .where(whereObj)
      .skip(skip ?? 0)
      .take(take ?? this.DEFALUT_TAKE_QUESTIONS_COUNT)
      .orderBy("created_at", "DESC");

    const data = await builder.getMany();

    return data;
  }

  public static async findAllAnswerByArgs(args): Promise<PostAnswer[]> {
    const data = await PostAnswer.find(args);

    return data;
  }

  public static async findOneQuestionById(id): Promise<PostQuestion> {
    const question = await PostQuestion.findOne({ id: id });

    return question;
  }

  public static async addNewQuestion(args, user): Promise<PostQuestion> {
    const newQuestion = new PostQuestion();
    newQuestion.userId = user.id;
    newQuestion.title = args.title;
    newQuestion.desc = args.desc;
    newQuestion.realtimeShare = args.realtime_share;
    await newQuestion.save();

    return newQuestion;
  }
}
