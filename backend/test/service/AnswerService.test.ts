import Container from "typedi";
import AnswerInput from "../../src/dto/AnswerInput";
import AnswerService from "../../src/services/Answer/AnswerService";
import faker from "faker";
import { User } from "../../src/entities/User";
import InjectionConfig from "../../src/InjectionConfig";
import connection from "../connection";
import { Connection, EntityManager } from "typeorm";
import { TransactionalTestContext } from "typeorm-transactional-tests";
import QuestionMock from "../mockdata/QuestionMock";
import UserMock from "../mockdata/userMock";

describe("AnswerService", () => {
  let answerService: AnswerService;
  let conn: Connection;
  let transactionalContext: TransactionalTestContext;
  let entityManager: EntityManager;

  beforeEach(async () => {
    answerService = Container.get("AnswerService");
    transactionalContext = new TransactionalTestContext(conn);
    await transactionalContext.start();
    entityManager = conn.manager;
  });

  afterEach(async () => {
    await transactionalContext.finish();
  });

  beforeAll(async () => {
    conn = await connection.connectIfNotExists();
    InjectionConfig();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("답변글 등록시 점수 증가", async () => {
    // given
    const questionUser = new UserMock().getOne();
    await entityManager.save(questionUser);

    const question = new QuestionMock().getOne();
    question.userId = questionUser.id;
    await entityManager.save(question);

    const answerUser = new UserMock().getOne();
    const beforeScore = answerUser.score;
    await entityManager.save(answerUser);

    const answerInput = new AnswerInput();
    answerInput.desc = faker.random.words(20);

    // when
    const addedAnswer = await answerService.addNew(
      answerInput,
      answerUser.id,
      question.id
    );
    const answeredUser = await entityManager.findOne(User, {
      id: answerUser.id,
    });

    // then
    expect(addedAnswer.postQuestionId).toBe(question.id);
    expect(answeredUser.score).toBe(beforeScore + 10);
  });
});
