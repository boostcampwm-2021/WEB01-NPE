import AnswerInput from "@src/dto/AnswerInput";
import { PostAnswer } from "@src/entities/PostAnswer";
import AnswerRepositoryImpl from "@src/repositories/Answer/AnswerRepositoryImpl";

describe("AnswerRepository", () => {
  let instance: AnswerRepositoryImpl;

  beforeEach(() => {
    instance = new AnswerRepositoryImpl();
  });

  it("modify", async () => {
    // given
    const ANSWER_ID = 1;
    const answerInput = new AnswerInput();
    answerInput.desc = "Desc bla bla...";

    instance.findById = jest
      .fn()
      .mockImplementation(async (answerId: number) => {
        const originAnswer = new PostAnswer();
        originAnswer.id = answerId;

        return originAnswer;
      });
    instance.save = jest
      .fn()
      .mockImplementation(async (answer: PostAnswer) => answer);

    // when
    const modifiedAnswer = await instance.modify(ANSWER_ID, answerInput);

    // then
    expect(modifiedAnswer.id).toBe(ANSWER_ID);
    expect(modifiedAnswer.desc).toBe(answerInput.desc);
  });
});
