import AnswerInput from "@src/dto/AnswerInput";
import PostAnswer from "@src/entities/PostAnswer";
import AnswerRepository from "@src/repositories/Answer/AnswerRepository";
import QuestionRepository from "@src/repositories/Question/QuestionRepository";
import UserRepository from "@src/repositories/User/UserRepository";
import AnswerServiceImpl from "@src/services/Answer/AnswerServiceImpl";
import Container from "typedi";
import InjectRepo from "./InjectRepo";

describe("AnswerRepository", () => {
  let instance: AnswerServiceImpl;
  let answerRepo: AnswerRepository;

  beforeEach(() => {
    InjectRepo();
    instance = new AnswerServiceImpl();

    answerRepo = Container.get("AnswerRepository");
  });

  it("modify 답변글 내용 수정", async () => {
    // given
    const answer = new AnswerInput();
    answer.desc = "Desc bla bla ...";

    answerRepo.findById = jest.fn().mockResolvedValue(new PostAnswer());

    answerRepo.saveOrUpdate = jest
      .fn()
      .mockImplementation((a: PostAnswer) => a);

    // when
    const modifiedAnswser = await instance.modify(1, answer);

    // then
    expect(modifiedAnswser.desc).toBe(answer.desc);
  });
});
