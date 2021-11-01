import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostAnswer } from "./PostAnswer";
import { User } from "./User";
import { PostQuestionHasTag } from "./PostQuestionHasTag";

@Index("fk_post_question_user_idx", ["userId"], {})
@Entity("post_question")
export class PostQuestion extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("text", { name: "desc" })
  desc: string;

  @Column("int", { name: "view_count", default: () => "'0'" })
  viewCount: number;

  @Column("tinyint", { name: "realtime_share" })
  realtimeShare: number;

  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("int", { name: "thumbup_count", default: () => "'0'" })
  thumbupCount: number;

  @Column("float", { name: "score", nullable: true, precision: 12 })
  score: number | null;

  @OneToMany(() => PostAnswer, (postAnswer) => postAnswer.postQuestion)
  postAnswers: PostAnswer[];

  @ManyToOne(() => User, (user) => user.postQuestions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @OneToMany(
    () => PostQuestionHasTag,
    (postQuestionHasTag) => postQuestionHasTag.postQuestion
  )
  postQuestionHasTags: PostQuestionHasTag[];
}
