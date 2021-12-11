import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import User from "./User";
import PostAnswer from "./PostAnswer";
import Tag from "./Tag";

@Entity()
@ObjectType("PostQuestion", {
  description:
    "질문글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
})
export default class PostQuestion {
  @Field(() => Int, {
    description: "해당 글의 고유 id. 글 생성 순으로 지정",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { description: "해당 글 작성자의 id" })
  @Column("int", { primary: true })
  userId: number;

  @Field({ description: "글 제목" })
  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Field({ description: "글 내용" })
  @Column("text")
  desc: string;

  @Field(() => Int, { description: "글 조회수" })
  @Column("int", { default: 0 })
  viewCount: number;

  @Field(() => Boolean, { description: "채택 여부" })
  @Column("bool", { default: false })
  adopted: boolean;

  @Field(() => Boolean, { description: "실시간 공유 여부" })
  @Column("bool")
  realtimeShare: boolean;

  @Field(() => Int, { description: "좋아요 개수" })
  @Column("int", { default: 0 })
  thumbupCount: number;

  @Field({ description: "글 작성 시각" })
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => PostAnswer, (postAnswer) => postAnswer.postQuestion, {
    cascade: true,
  })
  postAnswers: PostAnswer[];

  @ManyToOne(() => User, (user) => user.postQuestions)
  user: User;

  @ManyToMany(() => Tag)
  @JoinTable({ name: "question_tags" })
  tags: Tag[];
}
