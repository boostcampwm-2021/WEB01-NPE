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
import { ObjectType, Field, ID, Int, Float, Authorized } from "type-graphql";

@Index("fk_post_question_user_idx", ["userId"], {})
@Entity("post_question")
@ObjectType("PostQuestion", {
  description:
    "질문글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
})
export class PostQuestion {
  @Field(() => ID, {
    description: "해당 글의 고유 id. 글 생성 순으로 지정",
  })
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Field(() => Int, { description: "해당 글 작성자의 id" })
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Field({ description: "글 제목" })
  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Field({ description: "글 내용" })
  @Column("text", { name: "desc" })
  desc: string;

  @Field(() => Int, { description: "글 조회수" })
  @Column("int", { name: "view_count", default: () => "'0'" })
  viewCount: number;

  @Field(() => Boolean, { description: "채택 여부", defaultValue: 0 })
  @Column("tinyint", { name: "adopted", default: () => "'0'" })
  adopted: number;

  @Field(() => Boolean, { description: "실시간 공유 여부" })
  @Column("tinyint", { name: "realtime_share" })
  realtimeShare: number;

  @Field({ description: "글 생성 시각" })
  @Column("datetime", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Field(() => Int, { description: "좋아요 개수" })
  @Column("int", { name: "thumbup_count", default: () => "'0'" })
  thumbupCount: number;

  @Field(() => Float, {
    description: "(미구현)글 채택시 지급할 점수",
    nullable: true,
  })
  @Column("float", { name: "score", nullable: true, precision: 12 })
  score: number | null;

  @OneToMany(() => PostAnswer, (postAnswer) => postAnswer.postQuestion, {
    cascade: true,
  })
  postAnswers: PostAnswer[];

  @ManyToOne(() => User, (user) => user.postQuestions, {
    onDelete: "CASCADE",
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
