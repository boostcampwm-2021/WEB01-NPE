import Tag from "@src/entities/Tag";
import Mock from "./mock";
import faker from "faker";

export default class TagMock implements Mock<Tag> {
  getOne() {
    const tag = new Tag();
    tag.name = faker.datatype.string(10);

    return tag;
  }

  getMany(count: number) {
    const tags: Tag[] = [];
    for (let i = 0; i < count; i++) tags.push(this.getOne());

    return tags;
  }
}
