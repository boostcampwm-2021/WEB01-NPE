import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { PostQuestionHasTag } from "../entities/PostQuestionHasTag";

export default interface PostQuestionHasTagRepository
  extends Repository<PostQuestionHasTag> {}

@EntityRepository(PostQuestionHasTag)
export class PostQuestionHasTagRepositoryImpl extends Repository<PostQuestionHasTag> {}
