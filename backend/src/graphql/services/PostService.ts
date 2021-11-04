import { createQueryBuilder, FindOperator, Like } from "typeorm";
import { PostAnswer } from "../../entities/PostAnswer";
import { PostQuestion } from "../../entities/PostQuestion";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import { Tag } from "../../entities/Tag";
import { User } from "../../entities/User";

export default class PostService {
  private static DEFALUT_TAKE_QUESTIONS_COUNT = 20;
  public static async findAllQuestionByArgs(args): Promise<PostQuestion[]> {
    const { author, tagIDs, skip, take } = args;
    const { title, desc, realtime_share } = args;

    const whereObj: Record<string, unknown> = {};

    if (realtime_share) whereObj.realtimeShare = realtime_share;
    if (title) whereObj.title = Like(`%${title}%`);
    if (desc) whereObj.desc = Like(`%${desc}%`);

    if (author) {
      const user = await User.findOne({ username: author });
      if (user) whereObj.userId = user.id;
      else return [];
    }

    const builder = PostQuestion.createQueryBuilder()
      .where(whereObj)
      .skip(skip ?? 0)
      .take(take ?? this.DEFALUT_TAKE_QUESTIONS_COUNT)
      .orderBy("id", "DESC");

    const dataArr = await builder.getMany();

    let questions = [];
    if (tagIDs) {
      for (const data of dataArr) {
        const data2 = await createQueryBuilder()
          .relation(PostQuestion, "postQuestionHasTags")
          .of(data)
          .loadMany();

        const data3 = data2.map((obj) => obj.tagId);

        if (tagIDs.every((tagID) => data3.includes(tagID)))
          questions.push(data);
      }
    } else {
      questions = dataArr;
    }

    return questions;
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

  public static async getAllTags(): Promise<Tag[]> {
    return Tag.find();
  }
}
