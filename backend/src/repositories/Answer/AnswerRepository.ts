import PostAnswer from "../../entities/PostAnswer";
import AnswerInput from "../../dto/AnswerInput";

export default interface AnswerRepository {
  findById(answerId: number): Promise<PostAnswer>;
  findAllByUserId(userId: number): Promise<PostAnswer[]>;
  findAllByQuestionId(id: number): Promise<PostAnswer[]>;
  saveOrUpdate(entity: PostAnswer): Promise<PostAnswer>;
  modify(answerId: number, answerInput: AnswerInput): Promise<PostAnswer>;
  deleteById(answerId: number): Promise<boolean>;
  countByQuestionId(questionId: number): Promise<number>;
}
