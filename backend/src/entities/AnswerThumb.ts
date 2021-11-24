import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_answer_thumb_user", ["userId"], {})
@Index("fk_answer_thumb_post_answer", ["postAnswerId"], {})
@Entity("answer_thumb")
export class AnswerThumb {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "post_answer_id" })
  postAnswerId: number;

  @Column("int")
  value: number;
}
