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

@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

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
