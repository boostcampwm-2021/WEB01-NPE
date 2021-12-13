import "reflect-metadata";
import QuestionRepository from "@src/repositories/Question/QuestionRepository";
import UserRepository from "@src/repositories/User/UserRepository";
import QuestionServiceImpl from "@src/services/Question/QuestionServiceImpl";
import Container from "typedi";
import InjectRepo from "./InjectRepo";
import PostQuestion from "@src/entities/PostQuestion";
import QuestionThumbRepository from "@src/repositories/QuestionThumb/QuestionThumbRepository";

describe("QuestionService", () => {
  let instance: QuestionServiceImpl;
  let questionRepo: QuestionRepository;
  let userRepo: UserRepository;
  let questionThumbRepo: QuestionThumbRepository;

  beforeEach(() => {
    InjectRepo();
    instance = new QuestionServiceImpl();

    questionRepo = Container.get("QuestionRepository");
    userRepo = Container.get("UserRepository");
    questionThumbRepo = Container.get("QuestionThumbRepository");
  });

  it("findById Id에 해당하는 글 없을시 에러", async () => {});

  it("search 없는 작성자 넘길 시 에러", async () => {});

  it("viewById 조회수 증가", async () => {
    // given
    const question = new PostQuestion();
    question.viewCount = 1;

    instance.findById = jest.fn().mockResolvedValue(question);
    questionRepo.saveOrUpdate = jest
      .fn()
      .mockImplementation((q: PostQuestion) => q);

    // when
    const viewedQuestion = await instance.viewById(1);

    // then
    expect(viewedQuestion.viewCount).toBe(2);
  });

  it("delete Thumb도 함께 삭제", async () => {
    // given
    const QUESTION_ID = 1;

    questionRepo.deleteById = jest.fn();
    questionThumbRepo.deleteByQuestionId = jest.fn();

    // when
    await instance.delete(QUESTION_ID);

    // then
    expect(questionRepo.deleteById).toBeCalledTimes(1);
    expect(questionRepo.deleteById).toBeCalledWith(QUESTION_ID);

    expect(questionThumbRepo.deleteByQuestionId).toBeCalledWith(1);
    expect(questionThumbRepo.deleteByQuestionId).toBeCalledWith(QUESTION_ID);
  });

  it("turnOffRealtimeShare 권한 없는 질문글 입력시 에러", async () => {});

  it("turnOffRealtimeShare 이미 turnoff된 질문글 입력시 에러", async () => {});
});
