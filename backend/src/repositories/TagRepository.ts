import { EntityRepository, getRepository, Repository } from "typeorm";
import { PostQuestionHasTag } from "../entities/PostQuestionHasTag";
import { Tag } from "../entities/Tag";

@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  private readonly questionHasTagRepository = getRepository(PostQuestionHasTag);
  public async getAllTags(): Promise<Tag[]> {
    return this.find();
  }

  public async findTagById(id: number): Promise<Tag> {
    return this.findOne({ id });
  }

  public async getAllTagIdsByQuestionId(id: number): Promise<number[]> {
    const tagRelations = await this.questionHasTagRepository.find({
      postQuestionId: id,
    });
    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }
}
