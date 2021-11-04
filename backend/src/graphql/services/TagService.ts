import { Tag } from "../../entities/Tag";

export default class TagService {
  public static async getAllTags(): Promise<Tag[]> {
    return Tag.find();
  }

  public static async findTagById(id: number): Promise<Tag> {
    return Tag.findOne({ id });
  }

  public static async findTagByName(name: string): Promise<Tag> {
    return Tag.findOne({ name });
  }
}
