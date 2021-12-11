import SearchQuestionInput from "../../dto/SearchQuestionInput";
import {
  createQueryBuilder,
  EntityRepository,
  FindConditions,
  In,
  Like,
  Repository,
} from "typeorm";
import QuestionInput from "../../dto/QuestionInput";
import PostQuestion from "../../entities/PostQuestion";
import QuestionRepository from "./QuestionRepository";
import Tag from "@src/entities/Tag";

@EntityRepository(PostQuestion)
export default class QuestionRepositoryImpl
  extends Repository<PostQuestion>
  implements QuestionRepository
{
  public async addNew(
    args: QuestionInput,
    tags: Tag[],
    userId: number
  ): Promise<PostQuestion> {
    const newQuestion = new PostQuestion();
    newQuestion.userId = userId;
    newQuestion.title = args.title;
    newQuestion.desc = args.desc;
    newQuestion.realtimeShare = args.realtimeShare;
    newQuestion.tags = tags;
    return await this.save(newQuestion);
  }

  public async findAllByUserId(userId: number): Promise<PostQuestion[]> {
    const questions = await this.find({ userId });

    return questions;
  }

  public async findById(id: number): Promise<PostQuestion> {
    const question = await this.findOne({ id });

    return question;
  }

  public async deleteById(questionId: number): Promise<boolean> {
    const result = await this.delete({ id: questionId });

    if (result.affected > 0) return true;
    else return false;
  }

  public async modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>,
    tags: Tag[]
  ) {
    const partialQuestion: PostQuestion = new PostQuestion();
    const originQuestion = await this.findById(questionId);
    partialQuestion.id = questionId;
    partialQuestion.userId = originQuestion.userId;
    partialQuestion.title = fieldsToUpdate.title;
    partialQuestion.desc = fieldsToUpdate.desc;
    partialQuestion.realtimeShare = fieldsToUpdate.realtimeShare;
    partialQuestion.tags = tags;

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
    searchQuery: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const { tagIDs, title, desc, realtimeShare } = searchQuery;
    const skip = searchQuery.skip ?? 0;
    const take = searchQuery.take ?? 30;

    const where: FindConditions<PostQuestion> = {};
    if (realtimeShare) where.realtimeShare = realtimeShare;
    if (title) where.title = Like(`%${title}%`);
    if (desc) where.desc = Like(`%${desc}%`);

    if (tagIDs && tagIDs.length > 0) {
      const questoinIds: { qid: number }[] = await createQueryBuilder()
        .select("postQuestionId", "qid")
        .from("question_tags", "q_t")
        .where("tagId IN (:ids)", { ids: tagIDs })
        .groupBy("qid")
        .having("COUNT(qid) = :len", { len: tagIDs.length })
        .getRawMany();

      where.id = In(questoinIds.map((questionIdObj) => questionIdObj.qid));
    }

    return await this.find({ where, skip, take, order: { createdAt: "DESC" } });
  }
}
