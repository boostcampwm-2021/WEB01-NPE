import Container from "typedi";
import { getCustomRepository } from "typeorm";
import { AnswerRepositoryImpl } from "./repositories/AnswerRepository";
import { AnswerThumbRepositoryImpl } from "./repositories/AnswerThumbRepository";
import { PostQuestionHasTagRepositoryImpl } from "./repositories/PostQuestionHasTagRepostiory";
import { QuestionRepositoryImpl } from "./repositories/QuestionRepository";
import { QuestionThumbRepositoryImpl } from "./repositories/QuestionThumbRepository";
import { TagRepositoryImpl } from "./repositories/TagRepository";
import { UserHasTagRepositoryImpl } from "./repositories/UserHasTagRepository";
import { UserRepositoryImpl } from "./repositories/UserRepository";
import { PostServiceImpl } from "./services/PostService";
import { TagServiceImpl } from "./services/TagService";
import { ThumbServiceImpl } from "./services/ThumbService";
import { UserServiceImpl } from "./services/UserService";

export default () => {
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

  // Other Variables
  Container.set("DEFALUT_TAKE_QUESTIONS_COUNT", 20);
};
