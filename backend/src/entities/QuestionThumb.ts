import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_question_thumb_user", ["userId"], {})
@Index("fk_question_thumb_post_question", ["postQuestionId"], {})
@Entity("question_thumb")
export class QuestionThumb {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "post_question_id" })
  postQuestionId: number;

  @Column("int")
  value: number;
}
