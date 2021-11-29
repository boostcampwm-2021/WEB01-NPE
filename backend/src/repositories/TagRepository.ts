import "reflect-metadata";
import { Service } from "typedi";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

@Service()
@EntityRepository(Tag)
export default class TagRepository extends Repository<Tag> {
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
