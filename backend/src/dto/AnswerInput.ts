import "reflect-metadata";
import { Length, MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "답변글 작성/수정시 사용되는 인자들" })
export default class AnswerInput {
  @Field({ description: "내용(최소 10자 이상)" })
  @Length(10)
  desc: string;
}
