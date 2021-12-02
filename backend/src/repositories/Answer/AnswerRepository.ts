import { Repository } from "typeorm";
import { PostAnswer } from "../../entities/PostAnswer";
import AnswerInput from "../../dto/AnswerInput";

export default interface AnswerRepository extends Repository<PostAnswer> {
  findById(answerId: number): Promise<PostAnswer>;
  findAllByUserId(userId: number): Promise<PostAnswer[]>;
  findAllByQuestionId(id: number): Promise<PostAnswer[]>;
  modify(answerId: number, answerInput: AnswerInput): Promise<PostAnswer>;
  deleteById(answerId: number): Promise<boolean>;
}
