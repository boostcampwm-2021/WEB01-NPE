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

@Index("fk_user_has_tag_user1_idx", ["userId"], {})
@Index("fk_user_has_tag_tag1_idx", ["tagId"], {})
@Entity("user_has_tag")
export class UserHasTag extends BaseEntity {
  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { primary: true, name: "tag_id" })
  tagId: number;

  @ManyToOne(() => User, (user) => user.userHasTags, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.userHasTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;

  @Column("int", { name: "count" })
  count: number;
}
