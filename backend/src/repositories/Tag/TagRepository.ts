import "reflect-metadata";
import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../../entities/Tag";

export default interface TagRepository {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  findByName(name: string): Promise<Tag>;
  findByIds(ids: number[]): Promise<Tag[]>;
}
