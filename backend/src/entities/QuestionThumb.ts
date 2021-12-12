import { Column, Entity } from "typeorm";
import Thumb from "./abstract/Thumb";

@Entity()
export default class QuestionThumb extends Thumb {
  @Column("int")
  postQuestionId: number;
}
