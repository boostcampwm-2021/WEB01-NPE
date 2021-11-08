import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostQuestionHasTag } from "./PostQuestionHasTag";
import { User } from "./User";

@ObjectType("Tag", { description: "태그 Ojbect 입니다." })
@Entity("tag")
export class Tag extends BaseEntity {
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

  @ManyToMany(() => User, (user) => user.tags)
  @JoinTable({
    name: "user_has_tag",
    joinColumns: [{ name: "tag_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "user_id", referencedColumnName: "id" }],
    schema: "mydb",
  })
  users: User[];
}
