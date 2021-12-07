import { EntityRepository, Repository } from "typeorm";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";
import PostQuestionHasTagRepository from "./PostQuestionHasTagRepostiory";

@EntityRepository(PostQuestionHasTag)
export default class PostQuestionHasTagRepositoryImpl
  extends Repository<PostQuestionHasTag>
  implements PostQuestionHasTagRepository
{
  public async findAllTagIdsByQuestionId(questionId: number) {
    const relationRows = await this.find({
      where: { postQuestionId: questionId },
      select: ["tagId"],
    });

    const ids = relationRows.map((relationRow) => relationRow.tagId);

    return ids;
  }
}
