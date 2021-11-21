import { Tag } from "../entities/Tag";
import { PostQuestion } from "../entities/PostQuestion";
import { createQueryBuilder } from "typeorm";
import "reflect-metadata";
import { Service } from "typedi";

@Service()
export default class TagService {
  public async findAll(): Promise<Tag[]> {
    return Tag.find();
  }

  public async findById(id: number): Promise<Tag> {
    return Tag.findOne({ id });
  }

  public async findByIds(ids: number[]): Promise<Tag[]> {
    if (ids.length === 0) return [];
    return await Tag.find({
      where: ids.map((id) => ({ id })),
    });
  }

  public async findByName(name: string): Promise<Tag> {
    return Tag.findOne({ name });
  }

  public async findAllIdsByQuestionId(id: number): Promise<number[]> {
    const question = await PostQuestion.findOne({ id: id });
    const tagRelations = await createQueryBuilder()
      .relation(PostQuestion, "postQuestionHasTags")
      .of(question)
      .loadMany();

    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }
}
