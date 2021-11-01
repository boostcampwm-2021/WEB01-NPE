import { PostAnswer } from "../../entities/PostAnswer";
import { getConnection } from "typeorm";
import { PostQuestion } from "../../entities/PostQuestion";

export default class PostService {
  public static async findAllQuestionByArgs(args): Promise<PostQuestion[]> {
    const data = await PostQuestion.find(args);

    return data;
  }

  public static async findAllAnswerByArgs(args): Promise<PostAnswer[]> {
    const data = await PostAnswer.find(args);

    return data;
  }
}
