import { Tag } from "../entities/Tag";
import { PostQuestion } from "../entities/PostQuestion";
import { createQueryBuilder } from "typeorm";
import "reflect-metadata";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import TagRepository from "../repositories/TagRepository";
import QuestionRepository from "../repositories/QuestionRepository";

@Service()
export default class TagService {
  constructor(
    @InjectRepository()
    private readonly tagRepository: TagRepository,
    @InjectRepository()
    private readonly questionRepository: QuestionRepository
  ) {}

  public async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  public async findById(id: number): Promise<Tag> {
    return this.tagRepository.findOne({ id });
  }

  public async findByIds(ids: number[]): Promise<Tag[]> {
    if (ids.length === 0) return [];
    return await this.tagRepository.find({
      where: ids.map((id) => ({ id })),
    });
  }

  public async findByName(name: string): Promise<Tag> {
    return this.tagRepository.findOne({ name });
  }

  public async findAllIdsByQuestionId(id: number): Promise<number[]> {
    const question = await this.questionRepository.findOne({ id: id });
    const tagRelations = await createQueryBuilder()
      .relation(PostQuestion, "postQuestionHasTags")
      .of(question)
      .loadMany();

    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }
}
