import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PostAnswer from "./PostAnswer";
import PostQuestion from "./PostQuestion";

@ObjectType("User", {
  description:
    "유저 오브젝트 입니다. 하나의 오브젝트가 한 명(ID)의 유저입니다.",
})
@Entity()
export default class User {
  @Field(() => Int, {
    description: "유저의 고유 ID",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: "유저명" })
  @Column("varchar", { name: "username", length: 40 })
  username: string;

  @Field(() => Int, {
    description: "누적 점수. 랭킹 산정에 사용",
  })
  @Column("int", { name: "score", default: () => "'0'" })
  score: number;

  @Field({ description: "프로필 이미지 URL" })
  @Column("text")
  profileUrl: string;

  @Field({ description: "Github URL" })
  @Column("text")
  socialUrl: string;

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
}
