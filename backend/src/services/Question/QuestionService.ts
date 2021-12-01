import QuestionInput from "../../dto/QuestionInput";
import SearchQuestionInput from "../../dto/SearchQuestionInput";
import { PostQuestion } from "../../entities/PostQuestion";

export default interface QuestionService {
  search(args: SearchQuestionInput): Promise<PostQuestion[]>;
  findAllByUserId(userId: number): Promise<PostQuestion[]>;
  findById(id: number): Promise<PostQuestion>;
  viewById(id: number): Promise<PostQuestion>;
  getRank(): Promise<PostQuestion[]>;
  addNew(args: QuestionInput, userId: number): Promise<PostQuestion>;
  update(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ): Promise<PostQuestion>;
  delete(questionId: number): Promise<boolean>;
  getAnswerCount(questionId: number): Promise<number>;
  turnOffRealtimeShare(userId: number, questionId: number): Promise<boolean>;
}
