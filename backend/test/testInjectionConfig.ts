import Container from "typedi";
import TagRepositoryImpl from "../src/repositories/Tag/TagRepositoryImpl";
import UserRepositoryImpl from "../src/repositories/User/UserRepositoryImpl";
import QuestionRepositoryImpl from "../src/repositories/Question/QuestionRepositoryImpl";
import AnswerRepositoryImpl from "../src/repositories/Answer/AnswerRepositoryImpl";
import AnswerThumbRepositoryImpl from "../src/repositories/AnswerThumb/AnswerThumbRepositoryImpl";
import QuestionThumbRepositoryImpl from "../src/repositories/QuestionThumb/QuestionThumbRepositoryImpl";
import PostQuestionHasTagRepositoryImpl from "../src/repositories/PostQuestionHasTag/PostQuestionHasTagRepositoryImpl";
import UserHasTagRepositoryImpl from "../src/repositories/UserHasTag/UserHasTagRepositoryImpl";
jest.mock(`../src/repositories/Tag/TagRepositoryImpl`);
jest.mock(`../src/repositories/User/UserRepositoryImpl`);
jest.mock(`../src/repositories/Question/QuestionRepositoryImpl`);
jest.mock(`../src/repositories/Answer/AnswerRepositoryImpl`);
jest.mock(`../src/repositories/AnswerThumb/AnswerThumbRepositoryImpl`);
jest.mock(`../src/repositories/QuestionThumb/QuestionThumbRepositoryImpl`);
jest.mock(
  `../src/repositories/PostQuestionHasTag/PostQuestionHasTagRepositoryImpl`
);
jest.mock(`../src/repositories/UserHasTag/UserHasTagRepositoryImpl`);

export default () => {
  // mocking repository 생성
  const userRepositoryImpl = new UserRepositoryImpl();
  const tagRepositoryImpl = new TagRepositoryImpl();
  const userHasTagRepositoryImpl = new UserHasTagRepositoryImpl();
  const questionRepositoryImpl = new QuestionRepositoryImpl();
  const postQuestionHasTagRepositoryImpl =
    new PostQuestionHasTagRepositoryImpl();
  const answerRepositoryImpl = new AnswerRepositoryImpl();
  const questionThumbRepositoryImpl = new QuestionThumbRepositoryImpl();
  const answerThumbRepositoryImpl = new AnswerThumbRepositoryImpl();

  // 컨테이너에 mocking된 repository 등록
  Container.set("UserRepository", userRepositoryImpl);
  Container.set("TagRepository", tagRepositoryImpl);
  Container.set("UserHasTagRepository", userHasTagRepositoryImpl);
  Container.set("QuestionRepository", questionRepositoryImpl);
  Container.set(
    "PostQuestionHasTagRepository",
    postQuestionHasTagRepositoryImpl
  );
  Container.set("AnswerRepository", answerRepositoryImpl);
  Container.set("QuestionThumbRepository", questionThumbRepositoryImpl);
  Container.set("AnswerThumbRepository", answerThumbRepositoryImpl);

  // Variables
  Container.set("DEFALUT_TAKE_QUESTIONS_COUNT", 20);
};
