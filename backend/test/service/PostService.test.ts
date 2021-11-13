import { ConnectionOptions, createConnection, getConnection } from "typeorm";
import { PostQuestion } from "../../src/entities/PostQuestion";
import NoSuchQuestionError from "../../src/graphql/errors/NoSuchQuestionError";
import PostService from "../../src/graphql/services/PostService";
const DB_CONN_OPTIONS: ConnectionOptions = require("../../ormconfig.json")[
  "test"
];

/* 
  test DB 요구사항
  Question id -1 번은 존재하지 않아야 함
  Question id 2 번은 존재해야함
*/

beforeAll(async () => {
  const connection = await createConnection(DB_CONN_OPTIONS);
  return connection;
});

afterAll(async () => {
  const connection = getConnection();
  return await connection.close();
});

describe("findOneQuestionById", () => {
  it("있는 id에 대한 조회", async () => {
    // given
    const questionId = 2;
    const questionInDB = await PostQuestion.findOne({ id: questionId });
    expect(questionInDB).not.toBeUndefined();

    // when
    const question = await PostService.findOneQuestionById(questionId);

    // then
    expect(question).toMatchObject<PostQuestion>(questionInDB);
  });

  it("없는 id에 대한 조회", async () => {
    // given
    const questionId = -1;
    const maybeUndefined = await PostQuestion.findOne({ id: questionId });
    expect(maybeUndefined).toBeUndefined();

    // when
    const gettingNotExistingQuestion = async () => {
      await PostService.findOneQuestionById(questionId);
    };

    // then
    await expect(gettingNotExistingQuestion()).rejects.toThrow(
      NoSuchQuestionError
    );
  });
});

describe("findAllQuestionsByUserId", () => {
  it("해당 유저의 글을 모두 가져오는지", async () => {
    // given
    const userId = 1;
    const [questionsByUserIdInDB, count] = await PostQuestion.findAndCount({
      where: { userId: userId },
      select: ["id", "userId"],
    });

    // when
    const questionsByUserId = await PostService.findAllQuestionByUserId(userId);

    // then
    expect(questionsByUserId.length).toBe(count);
    expect(questionsByUserId).toMatchObject<PostQuestion[]>(
      questionsByUserIdInDB
    );
  });
});
