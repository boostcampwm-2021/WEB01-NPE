import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import PostQuestion from "./PostQuestion";

@ObjectType("Tag", { description: "태그 Ojbect 입니다." })
@Entity()
export default class Tag {
  @Field(() => Int, { description: "태그의 ID" })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: "태그의 이름" })
  @Column("varchar", { length: 30 })
  name: string;

  @ManyToMany(() => PostQuestion)
  questions: PostQuestion[];
}
