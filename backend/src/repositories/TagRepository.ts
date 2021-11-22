import "reflect-metadata";
import { Service } from "typedi";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Tag } from "../entities/Tag";
import PostQuestionHasTagRepository from "./PostQuestionHasTagRepostiory";

@Service()
@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
  constructor(
    @InjectRepository()
    private readonly questionHasTagRepository: PostQuestionHasTagRepository
  ) {
    super();
  }
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
