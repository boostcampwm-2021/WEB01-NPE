import { PostAnswer } from "../../entities/PostAnswer";
import { PostQuestion } from "../../entities/PostQuestion";

export default class PostService {
  public static async findAllQuestionByArgs(args): Promise<PostQuestion[]> {
    let data;

    // DB에서 적당히 검색하여 데이터 불러오기

    return data;
  }

  public static async findAllAnswerByArgs(args): Promise<PostAnswer[]> {
    const data = await PostAnswer.find(args);

    return data;
  }

  public static async findOneQuestionById(id): Promise<PostQuestion> {
    const question = await PostQuestion.findOneOrFail({ id: id });

    return question;
  }
}
