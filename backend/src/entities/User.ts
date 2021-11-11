import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  BaseEntity,
} from "typeorm";
import { PostAnswer } from "./PostAnswer";
import { PostQuestion } from "./PostQuestion";
import { Tag } from "./Tag";
import { UserHasTag } from "./UserHasTag";

@ObjectType("User", {
  description:
    "유저 오브젝트 입니다. 하나의 오브젝트가 한 명(ID)의 유저입니다.",
})
@Entity("user")
export class User extends BaseEntity {
  @Field(() => ID, {
    description: "유저의 고유 ID",
  })
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Field({ description: "유저명" })
  @Column("varchar", { name: "username", length: 40 })
  username: string;

  @Field(() => Int, {
    description: "누적 점수. 등급/랭킹 산정에 사용",
  })
  @Column("int", { name: "score", default: () => "'0'" })
  score: number;

  @Field({ description: "프로필 URL", nullable: true })
  @Column("text", { name: "profile_url", nullable: true })
  profileUrl: string | null;

  @Field({ description: "소셜 URL", nullable: true })
  @Column("text", { name: "social_url", nullable: true })
  socialUrl: string | null;

  @Field(() => [PostQuestion], {
    description: "유저가 작성한 질문글",
    nullable: "items",
  })
  @OneToMany(() => PostQuestion, (postQuestion) => postQuestion.user)
  postQuestions: PostQuestion[];

  @Field(() => [PostAnswer], {
    description: "유저가 작성한 답변글",
    nullable: "items",
  })
  @OneToMany(() => PostAnswer, (postAnswer) => postAnswer.user)
  postAnswers: PostAnswer[];

  @OneToMany(() => UserHasTag, (userHasTag) => userHasTag.user)
  userHasTags: UserHasTag[];
}
