import SearchQuestionInput from "../../dto/SearchQuestionInput";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import { Tag } from "../../entities/Tag";
import {
  createQueryBuilder,
  EntityRepository,
  In,
  Like,
  Repository,
  SelectQueryBuilder,
} from "typeorm";
import QuestionInput from "../../dto/QuestionInput";
import { PostQuestion } from "../../entities/PostQuestion";
import NoSuchQuestionError from "../../errors/NoSuchQuestionError";
import QuestionRepository from "./QuestionRepository";

@EntityRepository(PostQuestion)
export default class QuestionRepositoryImpl
  extends Repository<PostQuestion>
  implements QuestionRepository
{
  public async addNew(
    args: QuestionInput,
    userId: number
  ): Promise<PostQuestion> {
    const newQuestion = new PostQuestion();
    newQuestion.userId = userId;
    newQuestion.title = args.title;
    newQuestion.desc = args.desc;
    newQuestion.realtimeShare = args.realtimeShare ? 1 : 0;
    return await this.save(newQuestion);
  }

  public async findAllByUserId(userId: number): Promise<PostQuestion[]> {
    const questions = await this.find({ userId });

    return questions;
  }

  public async findById(id: number): Promise<PostQuestion> {
    const question = await this.findOne({ id });

    if (!question) throw new NoSuchQuestionError("Check ID");

    return question;
  }

  public async deleteById(questionId: number): Promise<boolean> {
    const result = await this.delete({ id: questionId });

    if (result.affected > 0) return true;
    else return false;
  }

  public async modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ) {
    const partialQuestion: PostQuestion = new PostQuestion();
    const originQuestion = await this.findById(questionId);
    partialQuestion.id = questionId;
    partialQuestion.userId = originQuestion.userId;
    partialQuestion.title = fieldsToUpdate.title;
    partialQuestion.desc = fieldsToUpdate.desc;
    partialQuestion.realtimeShare = fieldsToUpdate.realtimeShare ? 1 : 0;

    return await this.save(partialQuestion);
  }

  public async saveOrUpdate(question: PostQuestion): Promise<PostQuestion> {
    return await this.save(question);
  }

  public async findAndOrderByThumbCountDesc(
    take: number
  ): Promise<PostQuestion[]> {
    return await this.find({
      take: 5,
      order: { thumbupCount: "DESC" },
    });
  }

  public async findByArgs(
    where: object,
    skip: number,
    take: number
  ): Promise<PostQuestion[]> {
    const queryBuilder = this.createQueryBuilder()
      .where(where)
      .skip(skip)
      .take(take)
      .orderBy("id", "DESC");

    return await queryBuilder.getMany();
  }

  public async buildWhereBySearchQuery(
    searchQuery: SearchQuestionInput
  ): Promise<Record<string, unknown>> {
    const { tagIDs, title, desc, realtimeShare } = searchQuery;
    const whereObj: Record<string, unknown> = {};

    if (realtimeShare) whereObj.realtimeShare = realtimeShare;
    if (title) whereObj.title = Like(`%${title}%`);
    if (desc) whereObj.desc = Like(`%${desc}%`);

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

    return whereObj;
  }
}
