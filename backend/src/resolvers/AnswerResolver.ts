import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import PostAnswer from "../entities/PostAnswer";
import User from "../entities/User";
import AnswerInput from "../dto/AnswerInput";
import UserService from "../services/User/UserService";
import { Container } from "typedi";
import ThumbService from "../services/Thumb/ThumbService";
import AnswerService from "../services/Answer/AnswerService";
import AuthenticationError from "../errors/AuthenticationError";
import CommonError from "../errors/CommonError";
import QuestionService from "../services/Question/QuestionService";

@Resolver(PostAnswer)
export default class AnswerResolver {
  private readonly questionService: QuestionService =
    Container.get("QuestionService");
  private readonly answerService: AnswerService =
    Container.get("AnswerService");
  private readonly userService: UserService = Container.get("UserService");
  private readonly thumbService: ThumbService = Container.get("ThumbService");

  @Mutation(() => PostAnswer, { description: "답변글 작성 Mutation" })
  async addNewAnswer(
    @Arg("questionId", () => Int, { description: "질문글 ID" })
    questionId: number,
    @Arg("data") answerData: AnswerInput,
    @Ctx("userId") userId: number
  ): Promise<PostAnswer> {
    return await this.answerService.addNew(answerData, userId, questionId);
  }

  @FieldResolver(() => User, { description: "작성자 User Object" })
  async author(@Root() answer: PostAnswer): Promise<User> {
    return await this.userService.findById(answer.userId);
  }

  @Mutation(() => PostAnswer, { description: "답변글 수정 Mutation" })
  async updateAnswer(
    @Arg("answernId", () => Int, { description: "수정할 답변글의 ID" })
    answerId: number,
    @Arg("data", { description: "수정할 답변글 내용" })
    answerInput: AnswerInput,
    @Ctx("userId") userId: number
  ): Promise<PostAnswer> {
    const answer = await this.answerService.findById(answerId);
    if (userId !== answer.userId)
      throw new AuthenticationError("not your answer!");

    return await this.answerService.modify(answerId, answerInput);
  }

  @Mutation(() => Boolean, {
    description: "답변글 삭제 Mutation, 삭제 여부를 Boolean 으로 반환합니다.",
  })
  async deleteAnswer(
    @Arg("answerId", { description: "삭제할 질문글의 ID" }) answerId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const answer = await this.answerService.findById(answerId);
    if (userId !== answer.userId)
      throw new AuthenticationError("not your answer!");

    return await this.answerService.delete(answerId);
  }

  @Mutation(() => Boolean, {
    description: "답변글 좋아요 Mutation. 성공 여부 boolean 반환",
  })
  async thumbUpAnswer(
    @Arg("answerId", { description: "좋아요 표시할 답변글의 ID" })
    answerId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const result = await this.thumbService.answerThumbUp(answerId, userId);

    return result;
  }

  @Mutation(() => Boolean, {
    description: "답변글 싫어요 Mutation. 성공 여부 boolean 반환",
  })
  async thumbDownAnswer(
    @Arg("answerId", { description: "싫어요 표시할 답변글의 ID" })
    answerId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const result = await this.thumbService.answerThumbDown(answerId, userId);

    return result;
  }

  @Mutation(() => Boolean, {
    description:
      "답변글 채택 Mutation. 성공 여부 boolean 반환. 실패시 자신의 질문글에 대한 채택",
  })
  async adoptAnswer(
    @Arg("answerId", { description: "채택할 답변글의 ID" })
    answerId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const answer = await this.answerService.findById(answerId);
    const question = await this.questionService.findById(answer.postQuestionId);

    if (answer.postQuestionUserId !== userId)
      throw new AuthenticationError("not your question.");

    if (answer.userId === userId)
      throw new CommonError("can't adopt your answer");

    if (question.adopted === true)
      throw new CommonError("question already adopted another answer");

    if (answer.state !== 0) {
      throw new CommonError("answer is already adopted");
    }

    return await this.answerService.adopt(answerId);
  }
}
