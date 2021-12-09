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
import { PostAnswer } from "../entities/PostAnswer";
import { PostQuestion } from "../entities/PostQuestion";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import QuestionInput from "../dto/QuestionInput";
import SearchQuestionInput from "../dto/SearchQuestionInput";
import TagService from "../services/Tag/TagService";
import UserService from "../services/User/UserService";
import "reflect-metadata";
import { Container } from "typedi";
import ThumbService from "../services/Thumb/ThumbService";
import QuestionService from "../services/Question/QuestionService";
import AnswerService from "../services/Answer/AnswerService";

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
    const question = await this.questionService.findById(id);
    return question;
  }

  @Mutation(() => PostQuestion, {
    description: "questionId를 통해 하나의 질문글 조회(조회수 증가)",
  })
  async viewOneQuestionById(
    @Arg("id", () => Int, { description: "질문글 ID" }) id: number
  ) {
    const question = await this.questionService.viewById(id);
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
    const answers = await this.answerService.findAllByQuestionId(question.id);

    return answers;
  }

  @FieldResolver(() => Int, { description: "해당 질문글에 달린 답변글의 개수" })
  async answerCount(@Root() question: PostQuestion): Promise<number> {
    const count = this.questionService.getAnswerCount(question.id);

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
    const questions = await this.questionService.search(searchQuery);

    return questions;
  }

  @Mutation(() => PostQuestion, { description: "질문글 작성 Mutation" })
  async addNewQuestion(
    @Arg("data") questionData: QuestionInput,
    @Ctx("userId") userId: number
  ): Promise<PostQuestion> {
    const newQuestion = await this.questionService.addNew(questionData, userId);

    return newQuestion;
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
    const questionAuthor = question.userId;
    if (questionAuthor !== userId) throw new Error("Not your Post!");

    const updateResult = await this.questionService.modify(
      questionId,
      fieldsToUpdate
    );

    return await this.questionService.findById(questionId);
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
    const questionAuthor = question.userId;
    if (questionAuthor !== userId) throw new Error("Not your Post!");
    const isDeleted = await this.questionService.delete(questionId);

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
    const result = await this.questionService.turnOffRealtimeShare(
      userId,
      questionId
    );

    return result;
  }
}
