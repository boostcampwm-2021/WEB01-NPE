import "reflect-metadata";
import { Tag } from "../../entities/Tag";

export default interface TagRepository {
  findAll(): Promise<Tag[]>;
  findById(id: number): Promise<Tag>;
  findByName(name: string): Promise<Tag>;
  findByIds(ids: number[]): Promise<Tag[]>;
}
