import { Arg, Int, Query, Resolver } from "type-graphql";
import { getCustomRepository } from "typeorm";
import { Tag } from "../../entities/Tag";
import { UserHasTag } from "../../entities/UserHasTag";
import UserHasTagRepository from "../../repositories/UserHasTagRepository";
import TagService from "../services/TagService";

@Resolver(Tag)
export default class TagResolver {
  private readonly userHasTagRepository =
    getCustomRepository(UserHasTagRepository);
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

  @Query(() => [UserHasTag], { description: "유저가 사용한 태그 횟수 얻기" })
  async getUserUsedTagCount(
    @Arg("userId", () => Int, { description: "조회할 유저의 ID" })
    userId: number
  ) {
    const data = await this.userHasTagRepository.getAllTagsUsedByUserByUserId(
      userId
    );

    return data;
  }
}
