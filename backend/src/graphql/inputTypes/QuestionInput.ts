import { Length, MaxLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "질문글 작성/수정시 사용되는 인자들" })
export default class QuestionInput {
  @Field({ description: "제목" })
  @Length(5, 50)
  title: string;

  @Field({ description: "내용" })
  @Length(10)
  desc: string;

  @Field(() => Boolean, {
    description: "실시간 공유 여부",
    defaultValue: false,
  })
  realtimeShare: boolean;

  @Field(() => Int, { description: "채택시 지급할 점수", defaultValue: 0 })
  score: number;

  @Field(() => [Int], {
    description: "할당할 태그 id",
    nullable: "itemsAndList",
  })
  tagIds: number[];
}
