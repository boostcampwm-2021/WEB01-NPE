import { EntityRepository, Repository } from "typeorm";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import PostQuestionHasTagRepository from "./PostQuestionHasTagRepository";

@EntityRepository(PostQuestionHasTag)
export default class PostQuestionHasTagRepositoryImpl
  extends Repository<PostQuestionHasTag>
  implements PostQuestionHasTagRepository
{
  public async saveOrUpdate(
    entity: PostQuestionHasTag
  ): Promise<PostQuestionHasTag> {
    return await this.save(entity);
  }

  public async deleteByQuestionId(questionId: number) {
    const result = await this.delete({ postQuestionId: questionId });

    return result.affected === 0;
  }

  public async findAllTagIdsByQuestionId(
    questionId: number
  ): Promise<number[]> {
    const relationRows = await this.find({
      where: { postQuestionId: questionId },
      select: ["tagId"],
    });

    const ids = relationRows.map((relationRow) => relationRow.tagId);

    return ids;
  }
}
