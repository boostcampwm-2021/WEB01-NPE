import Container from "typedi";
import Tag from "../../entities/Tag";
import TagRepository from "../../repositories/Tag/TagRepository";
import TagService from "./TagService";

export default class TagServiceImpl implements TagService {
  private readonly tagRepository: TagRepository;

  constructor() {
    this.tagRepository = Container.get("TagRepository");
  }

  public async findAll(): Promise<Tag[]> {
    return await this.tagRepository.findAll();
  }

  public async findById(id: number): Promise<Tag> {
    return await this.tagRepository.findById(id);
  }

  public async findByIds(ids: number[]): Promise<Tag[]> {
    return await this.tagRepository.findByIds(ids);
  }

  public async findByName(name: string): Promise<Tag> {
    return await this.tagRepository.findByName(name);
  }

  public async findAllIdsByQuestionId(questionId: number): Promise<number[]> {
    const tags = await this.tagRepository.findByQuestionId(questionId);
    const tagIds = tags.map((tag) => tag.id);

    return tagIds;
  }

  // public async findAllByUserId(userId: number): Promise<UserHasTag[]> {
  //   const tagIds = await this.userHasTagRepository.findAllByUserId(userId);
  //   return tagIds;
  // }
}
