import Container from "typedi";
import { getCustomRepository } from "typeorm";
import AnswerRepositoryImpl from "./repositories/Answer/AnswerRepositoryImpl";
import AnswerThumbRepositoryImpl from "./repositories/AnswerThumb/AnswerThumbRepositoryImpl";
import PostQuestionHasTagRepositoryImpl from "./repositories/PostQuestionHasTag/PostQuestionHasTagRepositoryImpl";
import QuestionRepositoryImpl from "./repositories/Question/QuestionRepositoryImpl";
import QuestionThumbRepositoryImpl from "./repositories/QuestionThumb/QuestionThumbRepositoryImpl";
import TagRepositoryImpl from "./repositories/Tag/TagRepositoryImpl";
import UserHasTagRepositoryImpl from "./repositories/UserHasTag/UserHasTagRepositoryImpl";
import UserRepositoryImpl from "./repositories/User/UserRepositoryImpl";
import { PostServiceImpl } from "./services/PostService";
import { TagServiceImpl } from "./services/TagService";
import { ThumbServiceImpl } from "./services/ThumbService";
import { UserServiceImpl } from "./services/UserService";

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
  Container.set(
    "PostQuestionHasTagRepository",
    getCustomRepository(PostQuestionHasTagRepositoryImpl)
  );
  Container.set(
    "UserHasTagRepository",
    getCustomRepository(UserHasTagRepositoryImpl)
  );

  // Services
  Container.set("TagService", new TagServiceImpl());
  Container.set("UserService", new UserServiceImpl());
  Container.set("PostService", new PostServiceImpl());
  Container.set("ThumbService", new ThumbServiceImpl());
};
