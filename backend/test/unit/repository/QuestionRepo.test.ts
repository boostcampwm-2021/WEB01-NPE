import "reflect-metadata";
import QuestionInput from "@src/dto/QuestionInput";
import PostQuestion from "@src/entities/PostQuestion";
import QuestionRepositoryImpl from "@src/repositories/Question/QuestionRepositoryImpl";
import Tag from "@src/entities/Tag";

describe("QuestionRepository", () => {
  let instance: QuestionRepositoryImpl;

  beforeEach(() => {
    instance = new QuestionRepositoryImpl();
  });

  it("addNew", async () => {
    // given
    const USER_ID = 1;
    const questionInput = new QuestionInput();
    questionInput.title = "Title";
    questionInput.desc = "Desc bla bla...";
    questionInput.realtimeShare = true;

    const tag1 = new Tag();
    tag1.id = 1;
    tag1.name = "js";
    const tag2 = new Tag();
    tag2.id = 2;
    tag2.name = "ts";

    instance.save = jest
      .fn()
      .mockImplementation(async (question: PostQuestion) => question);

    // when
    const resultQuestion = await instance.addNew(
      questionInput,
      [tag1, tag2],
      USER_ID
    );

    // then
    expect(resultQuestion.title).toBe(questionInput.title);
    expect(resultQuestion.desc).toBe(questionInput.desc);
    expect(resultQuestion.realtimeShare).toBe(true);
    expect(resultQuestion.tags).toStrictEqual([tag1, tag2]);
  });

  it("modify", async () => {
    // given
    const USER_ID = 1;
    const QUESTION_ID = 1;
    const questionInput = new QuestionInput();
    questionInput.title = "Title";
    questionInput.desc = "Desc bla bla...";
    questionInput.realtimeShare = true;

    const tag1 = new Tag();
    tag1.id = 1;
    tag1.name = "js";
    const tag2 = new Tag();
    tag2.id = 2;
    tag2.name = "ts";

    instance.findById = jest
      .fn()
      .mockImplementation(async (questionId: number) => {
        const originQuestion = new PostQuestion();
        originQuestion.id = questionId;
        originQuestion.userId = USER_ID;

        return originQuestion;
      });
    instance.save = jest
      .fn()
      .mockImplementation(async (question: PostQuestion) => question);

    // when
    const modifiedQuestion = await instance.modify(QUESTION_ID, questionInput, [
      tag1,
      tag2,
    ]);

    // then
    expect(modifiedQuestion.id).toBe(QUESTION_ID);
    expect(modifiedQuestion.userId).toBe(USER_ID);
    expect(modifiedQuestion.title).toBe(questionInput.title);
    expect(modifiedQuestion.desc).toBe(questionInput.desc);
    expect(modifiedQuestion.realtimeShare).toBe(true);
    expect(modifiedQuestion.tags).toStrictEqual([tag1, tag2]);
  });
});
