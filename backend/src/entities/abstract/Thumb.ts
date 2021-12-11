import { Column, PrimaryGeneratedColumn } from "typeorm";

export enum ThumbValue {
  UP = 1,
  DOWN = -1,
}

export default abstract class Thumb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  userId: number;

  @Column({ type: "enum", enum: ThumbValue })
  value: ThumbValue;
}
