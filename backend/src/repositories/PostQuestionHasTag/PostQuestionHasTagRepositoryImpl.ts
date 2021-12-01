import { EntityRepository, Repository } from "typeorm";
import { PostQuestionHasTag } from "../../entities/PostQuestionHasTag";

@EntityRepository(PostQuestionHasTag)
export default class PostQuestionHasTagRepositoryImpl extends Repository<PostQuestionHasTag> {}
