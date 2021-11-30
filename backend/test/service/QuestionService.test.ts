import Container from "typedi";
import { when } from "jest-when";
import QuestionRepository from "../../src/repositories/Question/QuestionRepository";
import QuestionService from "../../src/services/Question/QuestionService";
import { PostQuestion } from "../../src/entities/PostQuestion";
import connection from "../connection";
import InjectionConfig from "../../src/InjectionConfig";
import faker from "faker";
import { User } from "../../src/entities/User";
import UserRepository from "../../src/repositories/User/UserRepository";

describe("QuestionService", () => {
  let questionRepository: QuestionRepository;
  let questionService: QuestionService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    questionService = Container.get("QuestionService");
    questionRepository = Container.get("QuestionRepository");
    userRepository = Container.get("UserRepository");
  });

  afterEach(async () => {
    await connection.clear();
  });

  beforeAll(async () => {
    await connection.connectIfNotExists();
    InjectionConfig();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("viewById 호출시 조회수 증가", async () => {
    // given
    const questionId = 1;
    const beforeView = 0;
    const expectedView = 1;
    const userId = faker.datatype.number();

    const user = new User();
    user.id = userId;
    user.username = faker.datatype.string(10);
    await userRepository.save(user);

    const question = new PostQuestion();
    question.id = questionId;
    question.userId = userId;
    question.viewCount = beforeView;
    question.title = faker.datatype.string(20);
    question.desc = faker.datatype.string(20);
    question.realtimeShare = 0;
    await questionRepository.save(question);

    // when
    const viewedQuetion = await questionService.viewById(questionId);

    // then
    expect(viewedQuetion.viewCount).toBe(expectedView);
  });
});
