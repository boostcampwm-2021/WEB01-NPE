import Container from "typedi";
import { getCustomRepository } from "typeorm";
import AnswerRepositoryImpl from "./repositories/Answer/AnswerRepositoryImpl";
import AnswerThumbRepositoryImpl from "./repositories/AnswerThumb/AnswerThumbRepositoryImpl";
import QuestionRepositoryImpl from "./repositories/Question/QuestionRepositoryImpl";
import QuestionThumbRepositoryImpl from "./repositories/QuestionThumb/QuestionThumbRepositoryImpl";
import TagRepositoryImpl from "./repositories/Tag/TagRepositoryImpl";
import UserRepositoryImpl from "./repositories/User/UserRepositoryImpl";
import TagServiceImpl from "./services/Tag/TagServiceImpl";
import ThumbServiceImpl from "./services/Thumb/ThumbServiceImpl";
import UserServiceImpl from "./services/User/UserServiceImpl";
import QuestionServiceImpl from "./services/Question/QuestionServiceImpl";
import AnswerServiceImpl from "./services/Answer/AnswerServiceImpl";

export default () => {
  // Variables
  Container.set("DEFALUT_TAKE_QUESTIONS_COUNT", 20);

  // Repositories
  Container.set("TagRepository", getCustomRepository(TagRepositoryImpl));
  Container.set("UserRepository", getCustomRepository(UserRepositoryImpl));
  Container.set(
    "QuestionRepository",
    getCustomRepository(QuestionRepositoryImpl)
  );
  Container.set("AnswerRepository", getCustomRepository(AnswerRepositoryImpl));
  Container.set(
    "AnswerThumbRepository",
    getCustomRepository(AnswerThumbRepositoryImpl)
  );
  Container.set(
    "QuestionThumbRepository",
    getCustomRepository(QuestionThumbRepositoryImpl)
  );

  // Services
  Container.set("TagService", new TagServiceImpl());
  Container.set("UserService", new UserServiceImpl());
  Container.set("QuestionService", new QuestionServiceImpl());
  Container.set("AnswerService", new AnswerServiceImpl());
  Container.set("ThumbService", new ThumbServiceImpl());
};
