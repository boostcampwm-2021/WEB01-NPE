import { Tag } from "../../entities/Tag";
import { PostQuestion } from "../../entities/PostQuestion";
import { createQueryBuilder } from "typeorm";

export default class TagService {
  public static async getAllTags(): Promise<Tag[]> {
    return Tag.find();
  }

  public static async findTagById(id: number): Promise<Tag> {
    return Tag.findOne({ id });
  }

  public static async findTagByIds(ids: number[]): Promise<Tag[]> {
    if (ids.length === 0) return [];
    return await Tag.find({
      where: ids.map((id) => ({ id })),
    });
  }

  public static async findTagByName(name: string): Promise<Tag> {
    return Tag.findOne({ name });
  }

  public static async getAllTagIdsByQuestionId(id: number): Promise<number[]> {
    const question = await PostQuestion.findOne({ id: id });
    const tagRelations = await createQueryBuilder()
      .relation(PostQuestion, "postQuestionHasTags")
      .of(question)
      .loadMany();

    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }
}
