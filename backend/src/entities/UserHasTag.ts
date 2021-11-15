import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Tag } from "./Tag";
import { User } from "./User";

@ObjectType({
  description: "유저의 태그 사용 관계 Object",
})
@Index("fk_user_has_tag_user1_idx", ["userId"], {})
@Index("fk_user_has_tag_tag1_idx", ["tagId"], {})
@Entity("user_has_tag")
export class UserHasTag extends BaseEntity {
  @Field(() => Int, {
    description: "유저의 고유 ID",
  })
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Field(() => Int, {
    description: "태그 ID",
  })
  @Column("int", { primary: true, name: "tag_id" })
  tagId: number;

  @ManyToOne(() => User, (user) => user.userHasTags, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @Field(() => Tag, {
    description: "태그 Object",
  })
  @ManyToOne(() => Tag, (tag) => tag.userHasTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;

  @Field(() => Int, {
    description: "해당 태그 사용 횟수",
  })
  @Column("int", { name: "count" })
  count: number;
}
