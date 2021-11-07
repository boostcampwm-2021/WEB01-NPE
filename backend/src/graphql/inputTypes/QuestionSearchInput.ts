import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "질문글 검색시 사용되는 인자들" })
export default class QuestionSearchInput {
  @Field({ nullable: true, description: "작성자 Username" })
  @MaxLength(40)
  author: string;

  @Field(() => [Int], {
    nullable: "itemsAndList",
    description: "포함할 tagId 배열",
  })
  tagIDs: number[];

  @Field(() => Int, {
    nullable: true,
    description: "(페이징) 건너뛸 Row 개수",
  })
  skip: number;

  @Field(() => Int, {
    nullable: true,
    description: "(페이징) 가져올 Row 개수",
  })
  take: number;

  @Field({ nullable: true, description: "제목에 포함하는 문자열" })
  @MaxLength(50)
  title: string;

  @Field({ nullable: true, description: "내용에 포함하는 문자열" })
  @MinLength(10)
  desc: string;

  @Field(() => Boolean, { nullable: true, description: "실시간 공유 여부" })
  realtimeShare: boolean;
}
