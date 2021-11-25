import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { sign } from "jsonwebtoken";
import { PostAnswer } from "../entities/PostAnswer";
import { PostQuestion } from "../entities/PostQuestion";
import { User } from "../entities/User";
import PostService from "../services/PostService";
import UserService from "../services/UserService";
import Container, { Service } from "typedi";

@Service()
@Resolver(User)
export default class UserResolver {
  private userService: UserService = Container.get(UserService);
  private postService: PostService = Container.get(PostService);

  @Query(() => User, {
    description: "User의 고유 ID를 통해 유저를 검색",
    nullable: true,
  })
  async findUserById(
    @Arg("id", () => Int, { description: "User의 고유 ID" }) id: number
  ) {
    const user = await this.userService.findById(id);

    return user;
  }

  @Query(() => User, {
    description: "유저명를 통해 유저를 검색",
    nullable: true,
  })
  async findUserByUsername(
    @Arg("username", { description: "유저명" }) username: string
  ) {
    const user = await this.userService.findByUsername(username);

    return user;
  }

  @FieldResolver(() => [PostQuestion], { nullable: "items" })
  async postQuestions(@Root() user: User): Promise<PostQuestion[]> {
    const questions = await this.postService.findAllQuestionByUserId(user.id);

    return questions;
  }

  @FieldResolver(() => [PostAnswer], { nullable: "items" })
  async postAnswers(@Root() user: User): Promise<PostAnswer[]> {
    const answers = await this.postService.findAllAnswerByUserId(user.id);

    return answers;
  }

  @Mutation(() => Boolean, {
    description: "유저 id가 존재하지 않을 시 생성. 신규 유저인 경우 true 반환",
  })
  async registerIfNotExists(
    @Arg("id", { description: "Github ID" }) id: number,
    @Arg("username", { description: "Github 유저 이름" }) username: string,
    @Arg("profileUrl", { description: "Github 프로필 URL" }) profileUrl: string,
    @Arg("socialUrl", { description: "github URL" }) socialUrl: string
  ) {
    let data = await this.userService.findById(id);
    let isNewUser = false;
    if (!data) {
      isNewUser = true;
      data = await this.userService.register(
        id,
        username,
        profileUrl,
        socialUrl
      );
    }

    return isNewUser;
  }

  @Query(() => [User], { description: "유저 점수 역순으로 5개 가져오기" })
  async getUsersRank(): Promise<User[]> {
    return await this.userService.getUsersRank();
  }
}
