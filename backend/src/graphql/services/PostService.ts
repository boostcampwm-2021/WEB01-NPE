import { createQueryBuilder, In, Like, SelectQueryBuilder } from "typeorm";
import { PostAnswer } from "../../entities/PostAnswer";
import { PostQuestion } from "../../entities/PostQuestion";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import { Tag } from "../../entities/Tag";
import { User } from "../../entities/User";
import AddQuestionInput from "../inputTypes/AddQuestionInput";
import SearchQuestionInput from "../inputTypes/SearchQuestionInput";

export default class PostService {
  private static DEFALUT_TAKE_QUESTIONS_COUNT = 20;
  public static async findAllQuestionByArgs(
    args: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const { author, tagIDs, skip, take } = args;
    const { title, desc, realtimeShare } = args;

    const whereObj: Record<string, unknown> = {};

    if (realtimeShare) whereObj.realtimeShare = realtimeShare;
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

  public static async findAllQuestionByUserId(
    userId: number
  ): Promise<PostQuestion[]> {
    const questions = await PostQuestion.find({ userId });

    return questions;
  }

  public static async findAllAnswerByUserId(
    userId: number
  ): Promise<PostAnswer[]> {
    const data = await PostAnswer.find({ userId });

    return data;
  }

  public static async findAllAnswerByQuestionId(
    id: number
  ): Promise<PostAnswer[]> {
    const data = await PostAnswer.find({ postQuestionId: id });

    return data;
  }

  public static async findOneQuestionById(id: number): Promise<PostQuestion> {
    const question = await PostQuestion.findOne({ id: id });

    return question;
  }

  public static async addNewQuestion(
    args: AddQuestionInput,
    // 이후 ctx.user 로 수정
    user: { id: number }
  ): Promise<PostQuestion> {
    const newQuestion = new PostQuestion();
    newQuestion.userId = user.id;
    newQuestion.title = args.title;
    newQuestion.desc = args.desc;
    newQuestion.realtimeShare = args.realtimeShare ? 1 : 0;
    await newQuestion.save();

    if (args.tagIds && args.tagIds.length > 0) {
      for (const tagId of args.tagIds) {
        const postQuestionHasTag = new PostQuestionHasTag();
        postQuestionHasTag.postQuestion = newQuestion;
        postQuestionHasTag.tagId = tagId;
        await postQuestionHasTag.save();
      }
    }

    return newQuestion;
  }

  public static async deleteQuestion(questionId: number): Promise<boolean> {
    const result = await PostQuestion.delete({ id: questionId });

    if (result.affected > 0) return true;
    else return false;
  }
}
