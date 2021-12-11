import PostQuestion from "../../entities/PostQuestion";
import QuestionInput from "../../dto/QuestionInput";
import SearchQuestionInput from "@src/dto/SearchQuestionInput";
import Tag from "@src/entities/Tag";

export default interface QuestionRepository {
  addNew(
    args: QuestionInput,
    tags: Tag[],
    userId: number
  ): Promise<PostQuestion>;
  deleteById(questionId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<PostQuestion[]>;
  findById(id: number): Promise<PostQuestion>;
  modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>,
    tags: Tag[]
  ): Promise<PostQuestion>;
  saveOrUpdate(question: PostQuestion): Promise<PostQuestion>;
  findAndOrderByThumbCountDesc(take: number): Promise<PostQuestion[]>;
  findByArgs(searchQuery: SearchQuestionInput): Promise<PostQuestion[]>;
}
