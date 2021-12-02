import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { PostQuestion } from "./PostQuestion";
import { Field, ID, Int, ObjectType } from "type-graphql";

@Index(
  "fk_table1_post_question1_idx",
  ["postQuestionId", "postQuestionUserId"],
  {}
)
@ObjectType("PostAnswer", {
  description:
    "답변글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
})
@Entity("post_answer")
export class PostAnswer {
  @Field(() => ID, {
    description: "해당 글의 고유 id. 글 생성 순으로 지정",
  })
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "post_question_id" })
  postQuestionId: number;

  @Column("int", { name: "post_question_user_id" })
  postQuestionUserId: number;

  @Field(() => Int, { description: "해당 답변글 작성자의 ID" })
  @Column("int", { name: "user_id" })
  userId: number;

  @Field({ description: "답변글 내용" })
  @Column("text", { name: "desc" })
  desc: string;

  @Field(() => Int, { description: "해당 답변글의 좋아요 개수" })
  @Column("int", { name: "thumbup_count", default: () => "'0'" })
  thumbupCount: number;

  @Field({ description: "해당 답변글의 생성 시각" })
  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Field(() => Int, { description: "(미구현)해당 답변글의 상태" })
  @Column("int", { name: "state", default: 0 })
  state: number;

  @ManyToOne(() => User, (user) => user.postAnswers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => PostQuestion, (postQuestion) => postQuestion.postAnswers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "post_question_id", referencedColumnName: "id" },
    { name: "post_question_user_id", referencedColumnName: "userId" },
  ])
  postQuestion: PostQuestion;
}
