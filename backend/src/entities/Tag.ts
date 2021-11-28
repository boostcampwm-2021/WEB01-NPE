import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostQuestionHasTag } from "./PostQuestionHasTag";
import { UserHasTag } from "./UserHasTag";

@ObjectType("Tag", { description: "태그 Ojbect 입니다." })
@Entity("tag")
export class Tag {
  @Field(() => ID, { description: "태그의 ID" })
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Field({ description: "태그의 이름" })
  @Column("varchar", { name: "name", length: 15 })
  name: string;

  @OneToMany(
    () => PostQuestionHasTag,
    (postQuestionHasTag) => postQuestionHasTag.tag
  )
  postQuestionHasTags: PostQuestionHasTag[];

  @OneToMany(() => UserHasTag, (userHasTag) => userHasTag.tag)
  userHasTags: UserHasTag[];
}
