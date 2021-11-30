import Container from "typedi";
import { getCustomRepository } from "typeorm";
import { AnswerRepositoryImpl } from "../src/repositories/AnswerRepository";
import { AnswerThumbRepositoryImpl } from "../src/repositories/AnswerThumbRepository";
import { PostQuestionHasTagRepositoryImpl } from "../src/repositories/PostQuestionHasTagRepostiory";
import { QuestionRepositoryImpl } from "../src/repositories/QuestionRepository";
import { QuestionThumbRepositoryImpl } from "../src/repositories/QuestionThumbRepository";
import { TagRepositoryImpl } from "../src/repositories/TagRepository";
import { UserHasTagRepositoryImpl } from "../src/repositories/UserHasTagRepository";
import { UserRepositoryImpl } from "../src/repositories/UserRepository";
import { PostServiceImpl } from "../src/services/PostService";
import { TagServiceImpl } from "../src/services/TagService";
import { ThumbServiceImpl } from "../src/services/ThumbService";
import { UserServiceImpl } from "../src/services/UserService";

export default () => {
  // Variables
  Container.set("DEFALUT_TAKE_QUESTIONS_COUNT", 20);

  // Repositories
  Container.set("TagRepository", getCustomRepository(TagRepositoryImpl));
  Container.set("UserRepository", getCustomRepository(UserRepositoryImpl));
  Container.set("QuestionRepository", {
    addNew: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  });
  Container.set("AnswerRepository", getCustomRepository(AnswerRepositoryImpl));
  Container.set(
    "AnswerThumbRepository",
    getCustomRepository(AnswerThumbRepositoryImpl)
  );
  Container.set(
    "QuestionThumbRepository",
    getCustomRepository(QuestionThumbRepositoryImpl)
  );
  Container.set("PostQuestionHasTagRepository", {
    save: jest.fn(),
  });
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
