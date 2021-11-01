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

@Entity("user")
export class User extends BaseEntity {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 40 })
  username: string;

  @Column("int", { name: "score", default: () => "'0'" })
  score: number;

  @Column("text", { name: "profile_url", nullable: true })
  profileUrl: string | null;

  @Column("text", { name: "social_url", nullable: true })
  socialUrl: string | null;

  @OneToOne(() => PostAnswer, (postAnswer) => postAnswer.user)
  postAnswer: PostAnswer;

  @OneToMany(() => PostQuestion, (postQuestion) => postQuestion.user)
  postQuestions: PostQuestion[];

  @ManyToMany(() => Tag, (tag) => tag.users)
  tags: Tag[];
}
