import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { PostQuestionHasTag } from "../entities/PostQuestionHasTag";

@Service()
@EntityRepository(PostQuestionHasTag)
export default class PostQuestionHasTagRepository extends Repository<PostQuestionHasTag> {}
