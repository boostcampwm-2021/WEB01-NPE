import { Arg, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { sign } from "jsonwebtoken";
import { PostAnswer } from "../../entities/PostAnswer";
import { PostQuestion } from "../../entities/PostQuestion";
import { User } from "../../entities/User";
import PostService from "../services/PostService";
//import instanceUserService from "../services/instanceUserService";
import UserService from "../services/UserService";

@Resolver(User)
export default class UserResolver {
  //constructor(private userService: instanceUserService) {}

  @Query(() => User, {
    description: "User의 고유 ID를 통해 유저를 검색",
    nullable: true,
  })
  async findUserById(
    @Arg("id", () => Int, { description: "User의 고유 ID" }) id: number
  ) {
    const data = await UserService.findOneUserById(id);

    return data;
  }

  @Query(() => User, {
    description: "유저명를 통해 유저를 검색",
    nullable: true,
  })
  async findUserByUsername(
    @Arg("username", { description: "유저명" }) username: string
  ) {
    const data = await UserService.findOneUserByUsername(username);

    return data;
  }

  @Query(() => String, {})
  async login(
    @Arg("id", { description: "Github ID" }) id: number,
    @Arg("username", { description: "Github 유저 이름" }) username: string,
    @Arg("profileUrl", { description: "Github 프로필 URL" }) profileUrl: string,
    @Arg("socialUrl", { description: "소셜 URL" }) socialUrl: string
  ) {
    const data = await UserService.findOneUserById(id);
    if (!data) {
      await UserService.addNewUser(id, username, profileUrl, socialUrl);
    }
    //console.log(data);
    const accessToken = sign(String(id), "jwtprivate", {
      encoding: "base64",
      algorithm: "HS512",
    });
    return accessToken;
  }

  @FieldResolver(() => [PostQuestion], { nullable: "items" })
  async postQuestions(@Root() user: User): Promise<PostQuestion[]> {
    const questions = PostService.findAllQuestionByUserId(user.id);

    return questions;
  }

  @FieldResolver(() => [PostAnswer], { nullable: "items" })
  async postAnswers(@Root() user: User): Promise<PostAnswer[]> {
    const answers = PostService.findAllAnswerByUserId(user.id);

    return answers;
  }
}
