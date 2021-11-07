import { Arg, Int, Query, Resolver } from "type-graphql";
import { Tag } from "../../entities/Tag";
import TagService from "../services/TagService";

@Resolver(Tag)
export default class TagResolver {
  @Query(() => Tag, { description: "태그 ID로 부터 태그 얻기", nullable: true })
  async getTagById(
    @Arg("id", () => Int, { description: "태그 ID" }) id: number
  ) {
    const tag = await TagService.findTagById(id);

    return tag;
  }

  @Query(() => Tag, {
    description: "태그 이름으로 부터 태그 얻기",
    nullable: true,
  })
  async getTagByName(
    @Arg("name", () => String, { description: "태그 이름" }) name: string
  ) {
    const tag = await TagService.findTagByName(name);

    return tag;
  }

  @Query(() => [Tag], { description: "모든 태그 얻기", nullable: "items" })
  async getAllTags() {
    const allTags = await TagService.getAllTags();

    return allTags;
  }
}
