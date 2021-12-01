import { EntityRepository, Repository } from "typeorm";
import { PostQuestion } from "../../entities/PostQuestion";
import NoSuchQuestionError from "../../errors/NoSuchQuestionError";
import QuestionInput from "../../dto/QuestionInput";
import { Service } from "typedi";

export default interface QuestionRepository extends Repository<PostQuestion> {
  addNew(args: QuestionInput, userId: number): Promise<PostQuestion>;
  deleteById(questionId: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<PostQuestion[]>;
  findById(id: number): Promise<PostQuestion>;
  modify(
    questionId: number,
    fieldsToUpdate: Partial<QuestionInput>
  ): Promise<PostQuestion>;
}
