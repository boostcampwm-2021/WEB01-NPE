import { Column, Entity } from "typeorm";
import Thumb from "./abstract/Thumb";

@Entity()
export default class AnswerThumb extends Thumb {
  @Column("int")
  postAnswerId: number;
}
