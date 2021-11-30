import "reflect-metadata";
import Container from "typedi";
import { Connection, getConnection } from "typeorm";
import QuestionInput from "../../src/dto/QuestionInput";
import { User } from "../../src/entities/User";
import QuestionRepository from "../../src/repositories/QuestionRepository";
import PostService from "../../src/services/PostService";
import connection from "../connection";
import testInjection from "../testInjectionConfig";

describe("findOneQuestionById", () => {
  let postService: PostService;
  let questionRepository: QuestionRepository;
  let conn: Connection;

  jest.setTimeout(10000);
  beforeAll(async () => {
    conn = await connection.connectIfNotExists();

    testInjection();
    postService = Container.get("PostService");
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("addNewQuestion", async () => {
    // given
    const newUser = new User();
    newUser.id = 1;

    const questionInput = new QuestionInput();
    questionInput.title = "abcde";
    questionInput.desc = "dfsasdfsadfsdfa";
    questionInput.realtimeShare = true;
    questionInput.score = 0;
    questionInput.tagIds = [];

    // when
    const addedQuestion = await postService.addNewQuestion(questionInput, 1);

    // then
    expect(addedQuestion.title).toBe(questionInput.title);
  });
});
