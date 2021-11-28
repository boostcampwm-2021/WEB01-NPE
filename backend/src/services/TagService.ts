import { Tag } from "../entities/Tag";
import { PostQuestion } from "../entities/PostQuestion";
import { createQueryBuilder } from "typeorm";
import "reflect-metadata";
import { Container, Service } from "typedi";
import TagRepository from "../repositories/TagRepository";
import QuestionRepository from "../repositories/QuestionRepository";
import UserRepository from "../repositories/UserRepository";
import { User } from "../entities/User";

export default interface TagService {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  findByIds(ids: number[]): Promise<Tag[]>;
  findByName(name: string): Promise<Tag>;
  findAllIdsByQuestionId(questionId: number): Promise<number[]>;
  findAllIdsByUserId(userId: number): Promise<number[]>;
}

@Service()
export class TagServiceImpl implements TagService {
  private readonly tagRepository: TagRepository;
  private readonly questionRepository: QuestionRepository;
  private readonly userRepository: UserRepository;

  constructor() {
    this.tagRepository = Container.get("TagRepository");
    this.questionRepository = Container.get("QuestionRepository");
    this.userRepository = Container.get("UserRepository");
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
    const question = await this.questionRepository.findById(questionId);
    const tagRelations = await createQueryBuilder()
      .relation(PostQuestion, "postQuestionHasTags")
      .of(question)
      .loadMany();

    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }

  public async findAllIdsByUserId(userId: number): Promise<number[]> {
    const user = await this.userRepository.findById(userId);
    const tagRelations = await createQueryBuilder()
      .relation(User, "userHasTags")
      .of(user)
      .loadMany();

    const tagIds = tagRelations.map((obj) => obj.tagId);

    return tagIds;
  }
}
