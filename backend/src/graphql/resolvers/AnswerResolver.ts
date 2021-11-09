import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { PostAnswer } from "../../entities/PostAnswer";
import { User } from "../../entities/User";
import AnswerInput from "../inputTypes/AnswerInput";
import PostService from "../services/PostService";
import UserService from "../services/UserService";

@Resolver(PostAnswer)
export default class AnswerResolver {
  @Mutation(() => PostAnswer, { description: "답변글 작성 Mutation" })
  async addNewAnswer(
    @Arg("questionId", () => Int, { description: "질문글 ID" })
    questionId: number,
    @Arg("data") answerData: AnswerInput
  ): Promise<PostAnswer> {
    const newAnswer = await PostService.addNewAnswer(
      answerData,
      {
        id: 1,
      },
      questionId
    );
    return newAnswer;
  }

  @FieldResolver(() => User, { description: "작성자 User Object" })
  async author(@Root() answer: PostAnswer): Promise<User> {
    const author = await UserService.findOneUserById(answer.userId);

    return author;
  }

  @Mutation(() => PostAnswer, { description: "답변글 수정 Mutation" })
  async updateAnswer(
    @Arg("answernId", () => Int, { description: "수정할 답변글의 ID" })
    answerId: number,
    @Arg("data", { description: "수정할 답변글 내용" })
    answerInput: AnswerInput
  ): Promise<PostAnswer> {
    const updateResult = await PostService.updateAnswer(answerId, answerInput);

    return await PostService.findOneAnswerById(answerId);
  }
}
