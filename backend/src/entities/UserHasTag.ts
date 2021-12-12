import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@ObjectType({
  description: "유저의 태그 사용 관계 Object",
})
@Entity("user_has_tag")
@Index(["userId", "tagId"], { unique: true })
export default class UserHasTag {
  @Field(() => Int, {
    description: "유저의 고유 ID",
  })
  @PrimaryColumn("int")
  userId: number;

  @Field(() => Int, {
    description: "태그 ID",
  })
  @PrimaryColumn("int")
  tagId: number;

  @Field(() => Int, {
    description: "해당 태그 사용 횟수",
  })
  @Column("int", { default: 0 })
  count: number;
}
