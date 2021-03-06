import AnswerInput from "../../dto/AnswerInput";
import PostAnswer from "../../entities/PostAnswer";

export default interface AnswerService {
  findAllByUserId(userId: number): Promise<PostAnswer[]>;
  findAllByQuestionId(questionId: number): Promise<PostAnswer[]>;
  addNew(
    args: AnswerInput,
    userId: number,
    questionId: number
  ): Promise<PostAnswer>;
  findById(answerId: number): Promise<PostAnswer>;
  modify(answerId: number, answerInput: AnswerInput): Promise<PostAnswer>;
  delete(answerId: number): Promise<boolean>;
  adopt(answerId: number): Promise<boolean>;
}
