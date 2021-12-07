import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PostQuestion } from "./PostQuestion";
import { Tag } from "./Tag";

@Index(
  "fk_post_question_has_tag_post_question1_idx",
  ["postQuestionId", "postQuestionUserId"],
  {}
)
@Index("fk_post_question_has_tag_tag1_idx", ["tagId"], {})
@Entity("post_question_has_tag")
export class PostQuestionHasTag {
  @Column("int", { primary: true, name: "post_question_id" })
  postQuestionId: number;

  @Column("int", { primary: true, name: "post_question_user_id" })
  postQuestionUserId: number;

  @Column("int", { primary: true, name: "tag_id" })
  tagId: number;

  @ManyToOne(
    () => PostQuestion,
    (postQuestion) => postQuestion.postQuestionHasTags,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "post_question_id", referencedColumnName: "id" },
    { name: "post_question_user_id", referencedColumnName: "userId" },
  ])
  postQuestion: PostQuestion;

  @ManyToOne(() => Tag, (tag) => tag.postQuestionHasTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;
}
