import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { verify } from "jsonwebtoken";
import { PostAnswer } from "../entities/PostAnswer";
import { User } from "../entities/User";
import AnswerInput from "../dto/AnswerInput";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import { Container } from "typeorm-typedi-extensions";

const getUserId = (headers: any): number => {
  if (!headers.authorization) throw new Error("Auth Error");
  const token = headers.authorization.split(" ")[1];
  return (verify(token, "keyboard cat") as any).userId;
};

@Resolver(PostAnswer)
export default class AnswerResolver {
  private readonly postService: PostService = Container.get(PostService);
  private readonly userService: UserService = Container.get(UserService);

  @Mutation(() => PostAnswer, { description: "답변글 작성 Mutation" })
  async addNewAnswer(
    @Arg("questionId", () => Int, { description: "질문글 ID" })
    questionId: number,
    @Arg("data") answerData: AnswerInput,
    @Ctx("headers") headers: any
  ): Promise<PostAnswer> {
    const userId = getUserId(headers);
    const newAnswer = await this.postService.addNewAnswer(
      answerData,
      userId,
      questionId
    );
    return newAnswer;
  }

  @FieldResolver(() => User, { description: "작성자 User Object" })
  async author(@Root() answer: PostAnswer): Promise<User> {
    const author = await this.userService.findById(answer.userId);

    return author;
  }

  @Mutation(() => PostAnswer, { description: "답변글 수정 Mutation" })
  async updateAnswer(
    @Arg("answernId", () => Int, { description: "수정할 답변글의 ID" })
    answerId: number,
    @Arg("data", { description: "수정할 답변글 내용" })
    answerInput: AnswerInput,
    @Ctx("headers") headers: any
  ): Promise<PostAnswer> {
    const userId = getUserId(headers);
    const answer = await this.postService.findOneAnswerById(answerId);
    const anwerAuthorId = answer.userId;
    if (userId !== anwerAuthorId) throw new Error("Not your Post!");
    const updateResult = await this.postService.updateAnswer(
      answerId,
      answerInput
    );

    return await this.postService.findOneAnswerById(answerId);
  }

  @Mutation(() => Boolean, {
    description: "답변글 삭제 Mutation, 삭제 여부를 Boolean 으로 반환합니다.",
  })
  async deleteAnswer(
    @Arg("answerId", { description: "삭제할 질문글의 ID" }) answerId: number,
    @Ctx("headers") headers: any
  ): Promise<boolean> {
    const userId = getUserId(headers);
    const answer = await this.postService.findOneAnswerById(answerId);
    const anwerAuthorId = answer.userId;
    if (userId !== anwerAuthorId) throw new Error("Not your Post!");
    const isDeleted = await this.postService.deleteAnswer(answerId);

    return isDeleted;
  }
}
