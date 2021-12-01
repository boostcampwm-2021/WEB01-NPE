import Container from "typedi";
import QuestionService from "../../src/services/Question/QuestionService";
import { PostQuestion } from "../../src/entities/PostQuestion";
import connection from "../connection";
import InjectionConfig from "../../src/InjectionConfig";
import faker from "faker";
import { User } from "../../src/entities/User";
import { Connection, EntityManager } from "typeorm";
import { TransactionalTestContext } from "typeorm-transactional-tests";
import UserMock from "../mockdata/userMock";
import QuestionMock from "../mockdata/QuestionMock";

describe("QuestionService", () => {
  let questionService: QuestionService;
  let conn: Connection;
  let transactionalContext: TransactionalTestContext;
  let entityManager: EntityManager;

  beforeEach(async () => {
    questionService = Container.get("QuestionService");
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

  it("viewById 호출시 조회수 증가", async () => {
    // given
    const user = new UserMock().getOne();
    const userId = user.id;
    await entityManager.save(user);

    const question = new QuestionMock().getOne();
    question.userId = userId;

    const savedQuestion = await entityManager.save(question);

    const questionId = savedQuestion.id;
    const beforeView = savedQuestion.viewCount;
    const afterView = beforeView + 1;

    // when
    const viewedQuetion = await questionService.viewById(questionId);

    // then
    expect(viewedQuetion.viewCount).toBe(afterView);
  });
});
