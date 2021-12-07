import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "User Dto" })
export default class UserDto {
  @Field(() => Int, { description: "Github ID" })
  id: number;

  @Field({ description: "Github 유저 이름" })
  username: string;

  @Field({ description: "Github 프로필 URL" })
  profileUrl: string;

  @Field({ description: "Github URL" })
  socialUrl: string;
}
