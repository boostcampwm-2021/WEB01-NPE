import "reflect-metadata";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import PostAnswer from "../entities/PostAnswer";
import PostQuestion from "../entities/PostQuestion";
import Tag from "../entities/Tag";
import User from "../entities/User";
import QuestionInput from "../dto/QuestionInput";
import SearchQuestionInput from "../dto/SearchQuestionInput";
import TagService from "../services/Tag/TagService";
import UserService from "../services/User/UserService";
import { Container } from "typedi";
import ThumbService from "../services/Thumb/ThumbService";
import QuestionService from "../services/Question/QuestionService";
import AnswerService from "../services/Answer/AnswerService";
import NoSuchUserError from "../errors/NoSuchUserError";
import AuthenticationError from "../errors/AuthenticationError";
import CommonError from "../errors/CommonError";

@Resolver(PostQuestion)
export default class QuestionResolver {
  private readonly userService: UserService = Container.get("UserService");
  private readonly tagService: TagService = Container.get("TagService");
  private readonly questionService: QuestionService =
    Container.get("QuestionService");
  private readonly answerService: AnswerService =
    Container.get("AnswerService");
  private readonly thumbService: ThumbService = Container.get("ThumbService");

  @Query(() => PostQuestion, {
    description: "questionID를 통해 하나의 질문글 검색",
  })
  async findOneQuestionById(
    @Arg("id", () => Int, { description: "질문글 ID" }) id: number
  ) {
    return await this.questionService.findById(id);
  }

  @Mutation(() => PostQuestion, {
    description: "questionId를 통해 하나의 질문글 조회(조회수 증가)",
  })
  async viewOneQuestionById(
    @Arg("id", () => Int, { description: "질문글 ID" }) id: number
  ) {
    return await this.questionService.viewById(id);
  }

  @FieldResolver(() => User, { description: "작성자 User Object" })
  async author(@Root() question: PostQuestion): Promise<User> {
    return await this.userService.findById(question.userId);
  }

  @FieldResolver(() => [PostAnswer], {
    description: "해당 질문글에 달린 답변글",
    nullable: "items",
  })
  async answers(@Root() question: PostQuestion): Promise<PostAnswer[]> {
    return await this.answerService.findAllByQuestionId(question.id);
  }

  @FieldResolver(() => Int, { description: "해당 질문글에 달린 답변글의 개수" })
  async answerCount(@Root() question: PostQuestion): Promise<number> {
    return await this.questionService.getAnswerCount(question.id);
  }

  @FieldResolver(() => [Tag], {
    description: "해당 글에 속한 태그들",
    nullable: "items",
  })
  async tags(@Root() question: PostQuestion): Promise<Tag[]> {
    const tagIds = await this.tagService.findAllIdsByQuestionId(question.id);
    return await this.tagService.findByIds(tagIds);
  }

  @Query(() => [PostQuestion], {
    description: "인자를 통해 질문글을 검색",
    nullable: "items",
  })
  async searchQuestions(
    @Arg("searchQuery") searchQuery: SearchQuestionInput
  ): Promise<PostQuestion[]> {
    const { author } = searchQuery;

    // 작성자 존재 확인
    if (author) {
      const user = await this.userService.findByUsername(author);
      if (!user) {
        throw new NoSuchUserError("No Such User! Check Username");
      }
    }

    return await this.questionService.search(searchQuery);
  }

  @Mutation(() => PostQuestion, { description: "질문글 작성 Mutation" })
  async addNewQuestion(
    @Arg("data") questionData: QuestionInput,
    @Ctx("userId") userId: number
  ): Promise<PostQuestion> {
    return await this.questionService.addNew(questionData, userId);
  }

  @Mutation(() => PostQuestion, { description: "질문글 수정 Mutation" })
  async updateQuestion(
    @Arg("questionId", () => Int, { description: "수정할 질문글의 ID" })
    questionId: number,
    @Arg("data", { description: "수정할 질문글 내용" })
    fieldsToUpdate: QuestionInput,
    @Ctx("userId") userId: number
  ): Promise<PostQuestion> {
    const question = await this.questionService.findById(questionId);
    if (question.userId !== userId)
      throw new AuthenticationError("not your post!");

    return await this.questionService.modify(questionId, fieldsToUpdate);
  }

  @Mutation(() => Boolean, {
    description: "질문글 삭제 Mutation, 삭제 여부를 Boolean 으로 반환합니다.",
  })
  async deleteQuestion(
    @Arg("questionId", { description: "삭제할 질문글의 ID" })
    questionId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    const question = await this.questionService.findById(questionId);
    if (question.userId !== userId)
      throw new AuthenticationError("Not your Post!");

    return await this.questionService.delete(questionId);
  }

  @Mutation(() => Boolean, {
    description: "질문글 좋아요 Mutation. 성공 여부 boolean 반환",
  })
  async thumbUpQuestion(
    @Arg("questionId", { description: "좋아요 표시할 질문글의 ID" })
    questionId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    return await this.thumbService.questionThumbUp(questionId, userId);
  }

  @Mutation(() => Boolean, {
    description: "질문글 싫어요 Mutation. 성공 여부 boolean 반환",
  })
  async thumbDownQuestion(
    @Arg("questionId", { description: "싫어요 표시할 질문글의 ID" })
    questionId: number,
    @Ctx("userId") userId: number
  ): Promise<boolean> {
    return await this.thumbService.questionThumbDown(questionId, userId);
  }

  @Query(() => [PostQuestion], {
    description: "질문글 좋아요 개수 역순으로 5개 가져오기",
  })
  async getQuestionsRank(): Promise<PostQuestion[]> {
    return await this.questionService.getRank();
  }

  @Mutation(() => Boolean, {
    description: "실시간 공유 끄기 Mutation",
  })
  async turnOffRealtimeShare(
    @Ctx("userId") userId: number,
    @Arg("questionId", { description: "싫어요 표시할 질문글의 ID" })
    questionId: number
  ) {
    const question = await this.questionService.findById(questionId);

    if (question.userId !== userId)
      throw new AuthenticationError("not your question!");

    if (question.realtimeShare === false)
      throw new CommonError("realtime share is already disabled");

    console.log("!!!");
    return await this.questionService.turnOffRealtimeShare(questionId);
  }
}
