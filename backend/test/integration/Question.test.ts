import Container from "typedi";
import QuestionService from "@src/services/Question/QuestionService";
import connection from "./connection";
import InjectionConfig from "@src/InjectionConfig";
import { Connection, EntityManager } from "typeorm";
import { TransactionalTestContext } from "typeorm-transactional-tests";
import UserMock from "./mockdata/userMock";
import QuestionMock from "./mockdata/QuestionMock";
import faker from "faker";
import "jest-sorted";
import TagMock from "./mockdata/TagMock";
import UserHasTag from "@src/entities/UserHasTag";
import PostQuestion from "@src/entities/PostQuestion";

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

  it("getRank 호출시 좋아요 수 역순으로 가져오는지", async () => {
    // given
    const user = new UserMock().getOne();
    const userId = user.id;
    await entityManager.save(user);

    const questions = new QuestionMock().getMany(20);
    for (const question of questions) {
      question.userId = userId;
      question.thumbupCount = faker.datatype.number({ min: 0, max: 1000 });

      await entityManager.save(question);
    }

    // when
    const questionsRank = await questionService.getRank();

    // then
    const thumbUpCounts = questionsRank.map(
      (question) => question.thumbupCount
    );

    expect(thumbUpCounts).toBeSorted({ descending: true });
  });

  it("addNew 새 포스트 등록시 QuestionTag,UserTag 적용 잘 되는지", async () => {
    // given
    const user = new UserMock().getOne();
    const userId = user.id;
    // 등록할 태그 개수
    const TAG_COUNT = 5;
    await entityManager.save(user);

    const tags = new TagMock().getMany(TAG_COUNT);
    const tagsSaved = await entityManager.save(tags);
    const tagIds = tagsSaved.map((tag) => tag.id);

    const questionInput = new QuestionMock().getOneInput();
    questionInput.tagIds = tagsSaved.map((tag) => tag.id);

    // when
    const addedQuestion = await questionService.addNew(questionInput, userId);
    const questionTagIds = addedQuestion.tags.map((tagEntity) => tagEntity.id);

    const userTags = await entityManager.find(UserHasTag, {
      where: { userId },
    });
    const userTagIds = userTags.map((ut) => ut.tagId);
    const userTagCounts = userTags.map((ut) => ut.count);

    // then
    expect(questionTagIds).toStrictEqual(tagIds);
    expect(userTagIds).toStrictEqual(tagIds);
    expect(userTagCounts).toStrictEqual([1, 1, 1, 1, 1]);
  });

  it("turnOffRealtimeShare 작동여부", async () => {
    // given
    const user = new UserMock().getOne();
    const userId = user.id;
    await entityManager.save(user);

    const question = new QuestionMock().getOne();
    question.realtimeShare = true;
    question.userId = userId;
    const beforeQuestion = await entityManager.save(question);
    const questionId = beforeQuestion.id;

    // when
    const result = await questionService.turnOffRealtimeShare(questionId);
    const afterQuestion = await entityManager.findOne(PostQuestion, {
      id: questionId,
    });

    // then
    expect(result).toBe(true);
    expect(afterQuestion.realtimeShare).toBe(false);
  });
});
