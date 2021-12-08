import { UserHasTag } from "../../entities/UserHasTag";
import Container from "typedi";
import { Tag } from "../../entities/Tag";
import TagRepository from "../../repositories/Tag/TagRepository";
import TagService from "./TagService";
import PostQuestionHasTagRepository from "@src/repositories/PostQuestionHasTag/PostQuestionHasTagRepository";
import UserHasTagRepository from "@src/repositories/UserHasTag/UserHasTagRepository";

export default class TagServiceImpl implements TagService {
  private readonly tagRepository: TagRepository;
  private readonly userHasTagRepository: UserHasTagRepository;
  private readonly postQuestionHasTagRepository: PostQuestionHasTagRepository;

  constructor() {
    this.tagRepository = Container.get("TagRepository");
    this.postQuestionHasTagRepository = Container.get(
      "PostQuestionHasTagRepository"
    );
    this.userHasTagRepository = Container.get("UserHasTagRepository");
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
    const tagIds =
      await this.postQuestionHasTagRepository.findAllTagIdsByQuestionId(
        questionId
      );

    return tagIds;
  }

  public async findAllByUserId(userId: number): Promise<UserHasTag[]> {
    const tagIds = await this.userHasTagRepository.findAllByUserId(userId);
    return tagIds;
  }
}
