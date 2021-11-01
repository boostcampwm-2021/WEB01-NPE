import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { PostQuestion } from "./PostQuestion";

@Index(
  "fk_table1_post_question1_idx",
  ["postQuestionId", "postQuestionUserId"],
  {}
)
@Entity("post_answer")
export class PostAnswer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "post_question_id" })
  postQuestionId: number;

  @Column("int", { name: "post_question_user_id" })
  postQuestionUserId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("int", { name: "thumbup_count", default: () => "'0'" })
  thumbupCount: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("int", { name: "state" })
  state: number;

  @OneToOne(() => User, (user) => user.postAnswer, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => PostQuestion, (postQuestion) => postQuestion.postAnswers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "post_question_id", referencedColumnName: "id" },
    { name: "post_question_user_id", referencedColumnName: "userId" },
  ])
  postQuestion: PostQuestion;
}
