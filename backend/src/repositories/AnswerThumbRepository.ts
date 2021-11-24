import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { AnswerThumb } from "../entities/AnswerThumb";

@Service()
@EntityRepository(AnswerThumb)
export default class AnswerThumbRepository extends Repository<AnswerThumb> {}
