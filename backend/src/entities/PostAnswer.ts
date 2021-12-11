import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import User from "./User";
import PostQuestion from "./PostQuestion";

@ObjectType("PostAnswer", {
  description:
    "답변글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
})
@Entity()
export default class PostAnswer {
  @Field(() => Int, {
    description: "해당 글의 고유 id. 글 생성 순으로 지정",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  postQuestionId: number;

  @Column("int")
  postQuestionUserId: number;

  @Field(() => Int, { description: "해당 답변글 작성자의 ID" })
  @Column("int")
  userId: number;

  @Field({ description: "답변글 내용" })
  @Column("text")
  desc: string;

  @Field(() => Int, { description: "해당 답변글의 좋아요 개수" })
  @Column("int", { default: 0 })
  thumbupCount: number;

  @Field(() => Int, { description: "해당 답변글의 채택 여부" })
  @Column("int", { default: 0 })
  state: number;

  @Field({ description: "글 작성 시각" })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.postAnswers)
  user: User;

  @ManyToOne(() => PostQuestion, (postQuestion) => postQuestion.postAnswers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  postQuestion: PostQuestion;
}
