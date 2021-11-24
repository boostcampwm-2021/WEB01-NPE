import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { verify } from "jsonwebtoken";
import { PostAnswer } from "../entities/PostAnswer";
import { PostQuestion } from "../entities/PostQuestion";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import QuestionInput from "../dto/QuestionInput";
import SearchQuestionInput from "../dto/SearchQuestionInput";
import PostService from "../services/PostService";
import TagService from "../services/TagService";
import UserService from "../services/UserService";
import "reflect-metadata";
import { Container } from "typeorm-typedi-extensions";
import ThumbService from "../services/ThumbService";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const getUserId = (headers: any): number => {
  if (!headers.authorization) throw new Error("Auth Error");
  const token = headers.authorization.split(" ")[1];
  return (verify(token, "keyboard cat") as any).userId;
};

@Resolver(PostQuestion)
export default class QuestionResolver {
  private userService: UserService = Container.get(UserService);
  private tagService: TagService = Container.get(TagService);
  private postService: PostService = Container.get(PostService);
  private thumbService: ThumbService = Container.get(ThumbService);

  @Query(() => PostQuestion, {
    description: "questionID를 통해 하나의 질문글 검색",
  })
  async findOneQuestionById(
    @Arg("id", () => Int, { description: "질문글 ID" }) id: number
  ) {
    const question = await this.postService.findOneQuestionById(id);
    return question;
  }

  @Mutation(() => PostQuestion, {
    description: "questionId를 통해 하나의 질문글 조회(조회수 증가)",
  })
  async viewOneQuestionById(
    @Arg("id", () => Int, { description: "질문글 ID" }) id: number
  ) {
    const question = await this.postService.viewOneQuestionById(id);
    return question;
  }

  @FieldResolver(() => User, { description: "작성자 User Object" })
  async author(@Root() question: PostQuestion): Promise<User> {
    const author = await this.userService.findById(question.userId);

    return author;
  }

  @FieldResolver(() => [PostAnswer], {
    description: "해당 질문글에 달린 답변글",
    nullable: "items",
  })
  async answers(@Root() question: PostQuestion): Promise<PostAnswer[]> {
    const answers = await this.postService.findAllAnswerByQuestionId(
      question.id
    );

    return answers;
  }

  @FieldResolver(() => Int, { description: "해당 질문글에 달린 답변글의 개수" })
  async answerCount(@Root() question: PostQuestion): Promise<number> {
    const count = this.postService.getAnswerCount(question.id);

    return count;
  }

  @FieldResolver(() => [Tag], {
    description: "해당 글에 속한 태그들",
    nullable: "items",
  })
  async tags(@Root() question: PostQuestion): Promise<Tag[]> {
    const tagIds = await this.tagService.findAllIdsByQuestionId(question.id);
    const tags = await this.tagService.findByIds(tagIds);

    return tags;
  }

  @Query(() => [PostQuestion], {
    description: "인자를 통해 질문글을 검색",
    nullable: "items",
  })
  async searchQuestions(
    @Arg("searchQuery") searchQuery: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const questions = await this.postService.findAllQuestionByArgs(searchQuery);

    return questions;
  }

  @Mutation(() => PostQuestion, { description: "질문글 작성 Mutation" })
  async addNewQuestion(
    @Arg("data") questionData: QuestionInput,
    @Ctx("headers") headers: any
  ): Promise<PostQuestion> {
    const userId = getUserId(headers);
    const newQuestion = await this.postService.addNewQuestion(
      questionData,
      userId
    );

    return newQuestion;
  }

  @Mutation(() => PostQuestion, { description: "질문글 수정 Mutation" })
  async updateQuestion(
    @Arg("questionId", () => Int, { description: "수정할 질문글의 ID" })
    questionId: number,
    @Arg("data", { description: "수정할 질문글 내용" })
    fieldsToUpdate: QuestionInput,
    @Ctx("headers") headers: any
  ): Promise<PostQuestion> {
    const question = await this.postService.findOneQuestionById(questionId);
    const questionAuthor = question.userId;
    const userId = getUserId(headers);
    if (questionAuthor !== userId) throw new Error("Not your Post!");

    const updateResult = await this.postService.updateQuestion(
      questionId,
      fieldsToUpdate
    );

    return await this.postService.findOneQuestionById(questionId);
  }

  @Mutation(() => Boolean, {
    description: "질문글 삭제 Mutation, 삭제 여부를 Boolean 으로 반환합니다.",
  })
  async deleteQuestion(
    @Arg("questionId", { description: "삭제할 질문글의 ID" })
    questionId: number,
    @Ctx("headers") headers: any
  ): Promise<boolean> {
    const question = await this.postService.findOneQuestionById(questionId);
    const questionAuthor = question.userId;
    const userId = getUserId(headers);
    if (questionAuthor !== userId) throw new Error("Not your Post!");
    const isDeleted = await this.postService.deleteQuestion(questionId);

    return isDeleted;
  }

  @Mutation(() => Boolean, {
    description: "질문글 좋아요 Mutation. 성공 여부 boolean 반환",
  })
  async thumbUpQuestion(
    @Arg("questionId", { description: "좋아요 표시할 질문글의 ID" })
    questionId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const result = await this.thumbService.questionThumbUp(questionId, userId);

    return result;
  }

  @Mutation(() => Boolean, {
    description: "질문글 싫어요 Mutation. 성공 여부 boolean 반환",
  })
  async thumbDownQuestion(
    @Arg("questionId", { description: "싫어요 표시할 질문글의 ID" })
    questionId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const result = await this.thumbService.questionThumbDown(
      questionId,
      userId
    );

    return result;
  }
}
