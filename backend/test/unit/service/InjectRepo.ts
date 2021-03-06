import Container from "typedi";
import AnswerRepositoryImpl from "@src/repositories/Answer/AnswerRepositoryImpl";
import AnswerThumbRepositoryImpl from "@src/repositories/AnswerThumb/AnswerThumbRepositoryImpl";
import QuestionRepositoryImpl from "@src/repositories/Question/QuestionRepositoryImpl";
import QuestionThumbRepositoryImpl from "@src/repositories/QuestionThumb/QuestionThumbRepositoryImpl";
import TagRepositoryImpl from "@src/repositories/Tag/TagRepositoryImpl";
import UserRepositoryImpl from "@src/repositories/User/UserRepositoryImpl";
import UserHasTagRepositoryImpl from "@src/repositories/UserHasTag/UserHasTagRepositoryImpl";

export default () => {
  // Variables
  Container.set("DEFALUT_TAKE_QUESTIONS_COUNT", 20);

  // Repositories
  Container.set("TagRepository", new TagRepositoryImpl());
  Container.set("UserRepository", new UserRepositoryImpl());
  Container.set("QuestionRepository", new QuestionRepositoryImpl());
  Container.set("AnswerRepository", new AnswerRepositoryImpl());
  Container.set("AnswerThumbRepository", new AnswerThumbRepositoryImpl());
  Container.set("QuestionThumbRepository", new QuestionThumbRepositoryImpl());
  Container.set("UserHasTagRepository", new UserHasTagRepositoryImpl());
};
