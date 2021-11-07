import { createQueryBuilder, In, Like, SelectQueryBuilder } from "typeorm";
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

    const builder = PostQuestion.createQueryBuilder()
      .where(whereObj)
      .skip(skip ?? 0)
      .take(take ?? this.DEFALUT_TAKE_QUESTIONS_COUNT)
      .orderBy("id", "DESC");

    return await builder.getMany();
  }

  public static async findAllAnswerByArgs(args): Promise<PostAnswer[]> {
    const data = await PostAnswer.find(args);

    return data;
  }

  public static async findAllAnswerByQuestionId(
    id: number
  ): Promise<PostAnswer[]> {
    const data = await PostAnswer.find({ postQuestionId: id });

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

  public static async getAllTagIdsByQuestionId(id: number): Promise<number[]> {
    const question = await PostQuestion.find({ id: id });
    const tagRelations = await createQueryBuilder()
      .relation(PostQuestion, "postQuestionHasTags")
      .of(question)
      .loadMany();

    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }
}
