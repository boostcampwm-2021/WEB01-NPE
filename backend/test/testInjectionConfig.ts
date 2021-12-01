import Container from "typedi";
import TagRepositoryImpl from "../src/repositories/Tag/TagRepositoryImpl";
import UserRepositoryImpl from "../src/repositories/User/UserRepositoryImpl";
import QuestionRepositoryImpl from "../src/repositories/Question/QuestionRepositoryImpl";
import AnswerRepositoryImpl from "../src/repositories/Answer/AnswerRepositoryImpl";
import AnswerThumbRepositoryImpl from "../src/repositories/AnswerThumb/AnswerThumbRepositoryImpl";
import QuestionThumbRepositoryImpl from "../src/repositories/QuestionThumb/QuestionThumbRepositoryImpl";
import PostQuestionHasTagRepositoryImpl from "../src/repositories/PostQuestionHasTag/PostQuestionHasTagRepositoryImpl";
import UserHasTagRepositoryImpl from "../src/repositories/UserHasTag/UserHasTagRepositoryImpl";
import { getCustomRepository } from "typeorm";

export default () => {
  const userRepositoryImpl = getCustomRepository(UserRepositoryImpl);
  const tagRepositoryImpl = getCustomRepository(TagRepositoryImpl);
  const userHasTagRepositoryImpl = getCustomRepository(
    UserHasTagRepositoryImpl
  );
  const questionRepositoryImpl = getCustomRepository(QuestionRepositoryImpl);
  const postQuestionHasTagRepositoryImpl = getCustomRepository(
    PostQuestionHasTagRepositoryImpl
  );
  const answerRepositoryImpl = getCustomRepository(AnswerRepositoryImpl);
  const questionThumbRepositoryImpl = getCustomRepository(
    QuestionThumbRepositoryImpl
  );
  const answerThumbRepositoryImpl = getCustomRepository(
    AnswerThumbRepositoryImpl
  );

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
