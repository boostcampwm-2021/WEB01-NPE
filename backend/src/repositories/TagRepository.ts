import "reflect-metadata";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

export default interface TagRepository {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  findByName(name: string): Promise<Tag>;
  findByIds(ids: number[]): Promise<Tag[]>;
}

@Service()
@EntityRepository(Tag)
export class TagRepositoryImpl
  extends Repository<Tag>
  implements TagRepository
{
  public async findAll(): Promise<Tag[]> {
    return await this.find();
  }

  public async findById(id: number): Promise<Tag> {
    return await this.findOne({ id });
  }

  public async findByName(name: string): Promise<Tag> {
    return await this.findOne({ name });
  }

  public async findByIds(ids: number[]): Promise<Tag[]> {
    if (ids.length === 0) return [];
    return await this.find({
      where: ids.map((id) => ({ id })),
    });
  }
}
