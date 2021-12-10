import AnswerInput from "@src/dto/AnswerInput";
import { PostAnswer } from "@src/entities/PostAnswer";
import { PostQuestion } from "@src/entities/PostQuestion";
import AuthorizationError from "@src/errors/AuthorizationError";
import CommonError from "@src/errors/CommonError";
import AnswerRepository from "@src/repositories/Answer/AnswerRepository";
import QuestionRepository from "@src/repositories/Question/QuestionRepository";
import UserRepository from "@src/repositories/User/UserRepository";
import AnswerServiceImpl from "@src/services/Answer/AnswerServiceImpl";
import Container from "typedi";
import InjectRepo from "./InjectRepo";

describe("AnswerRepository", () => {
  let instance: AnswerServiceImpl;
  let userRepo: UserRepository;
  let questionRepo: QuestionRepository;
  let answerRepo: AnswerRepository;

  beforeEach(() => {
    InjectRepo();
    instance = new AnswerServiceImpl();

    userRepo = Container.get("UserRepository");
    questionRepo = Container.get("QuestionRepository");
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

  it("adopt 자신의 질문글 아닐시 에러", async () => {
    // given
    const ANSWER_AUTHOR_ID = 1;
    const QUESTION_AUTHOR_ID = 2;
    const originAnswer = new PostAnswer();
    originAnswer.postQuestionUserId = ANSWER_AUTHOR_ID;

    answerRepo.findById = jest.fn().mockResolvedValue(originAnswer);
    userRepo.findById = jest.fn();
    questionRepo.findById = jest.fn();

    // when
    const testFn = () => instance.adopt(QUESTION_AUTHOR_ID, 1);

    // then
    expect(testFn).rejects.toThrowError(AuthorizationError);
  });

  it("adopt 자신의 답변글 채택시 에러", async () => {
    // given
    const ANSWER_AUTHOR_ID = 1;
    const REQUEST_AUTHOR_ID = 1;
    const originAnswer = new PostAnswer();
    originAnswer.postQuestionUserId = REQUEST_AUTHOR_ID;
    originAnswer.userId = ANSWER_AUTHOR_ID;

    answerRepo.findById = jest.fn().mockResolvedValue(originAnswer);
    userRepo.findById = jest.fn();
    questionRepo.findById = jest.fn();

    // when
    const testFn = () => instance.adopt(REQUEST_AUTHOR_ID, 1);

    // then
    expect(testFn).rejects.toThrowError(CommonError);
  });

  it("adopt 이미 채택된 답변 채택시 에러", async () => {
    // given
    const ANSWER_AUTHOR_ID = 1;
    const REQUEST_AUTHOR_ID = 2;
    const originAnswer = new PostAnswer();
    originAnswer.postQuestionUserId = REQUEST_AUTHOR_ID;
    originAnswer.userId = ANSWER_AUTHOR_ID;
    const question = new PostQuestion();
    question.adopted = 1;

    answerRepo.findById = jest.fn().mockResolvedValue(originAnswer);
    userRepo.findById = jest.fn();
    questionRepo.findById = jest.fn().mockResolvedValue(question);

    // when
    const testFn = () => instance.adopt(REQUEST_AUTHOR_ID, 1);

    // then
    expect(testFn).rejects.toThrowError(CommonError);
  });
});
