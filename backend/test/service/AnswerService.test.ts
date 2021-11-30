import Container from "typedi";
import AnswerInput from "../../src/dto/AnswerInput";
import QuestionRepository from "../../src/repositories/Question/QuestionRepository";
import AnswerService from "../../src/services/Answer/AnswerService";
import AnswerServiceImpl from "../../src/services/Answer/AnswerServiceImpl";
import testInjectionConfig from "../testInjectionConfig";
import faker from "faker";
import { PostQuestion } from "../../src/entities/PostQuestion";
import AnswerRepository from "../../src/repositories/Answer/AnswerRepository";
import { User } from "../../src/entities/User";
import InjectionConfig from "../../src/InjectionConfig";
import connection from "../connection";
import UserRepository from "../../src/repositories/User/UserRepository";

describe("AnswerService", () => {
  let answerService: AnswerService;
  let userRepository: UserRepository;
  let questionRepository: QuestionRepository;

  beforeEach(() => {
    answerService = Container.get("AnswerService");
    userRepository = Container.get("UserRepository");
    questionRepository = Container.get("QuestionRepository");
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

  it("새 답변글 등록", async () => {
    // given
    const questionId = faker.datatype.number();
    const questionUserId = faker.datatype.number();
    const questionUserScore = faker.datatype.number();
    const questionUsername = faker.datatype.string(10);

    const answerUserId = faker.datatype.number();
    const answerUserScore = faker.datatype.number();
    const answerUsername = faker.datatype.string(10);

    const answerInput = new AnswerInput();
    answerInput.desc = faker.random.words(5);

    const questionUser = new User();
    questionUser.id = questionUserId;
    questionUser.username = questionUsername;
    questionUser.score = questionUserScore;
    await userRepository.save(questionUser);

    const question = new PostQuestion();
    question.id = questionId;
    question.userId = questionUserId;
    question.title = faker.datatype.string(20);
    question.desc = faker.datatype.string(20);
    question.realtimeShare = 0;
    await questionRepository.save(question);

    const answerUser = new User();
    answerUser.id = answerUserId;
    answerUser.username = answerUsername;
    answerUser.score = answerUserScore;
    await userRepository.save(answerUser);

    // when
    const addedAnswer = await answerService.addNew(
      answerInput,
      answerUserId,
      questionId
    );

    // then
    expect(addedAnswer.postQuestionId).toBe(questionId);
  });
});
