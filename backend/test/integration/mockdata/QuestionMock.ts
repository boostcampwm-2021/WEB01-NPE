import { PostQuestion } from "@src/entities/PostQuestion";
import Mock from "./mock";
import faker from "faker";
import QuestionInput from "@src/dto/QuestionInput";

export default class QuestionMock implements Mock<PostQuestion> {
  getOne() {
    const question = new PostQuestion();
    question.title = faker.datatype.string(20);
    question.desc = faker.datatype.string(20);
    question.createdAt = new Date();
    question.realtimeShare = 0;

    return question;
  }

  getMany(count: number) {
    const questions: PostQuestion[] = [];
    for (let i = 0; i < count; i++) questions.push(this.getOne());

    return questions;
  }

  getOneInput() {
    const questionInput = new QuestionInput();
    questionInput.title = faker.datatype.string(20);
    questionInput.desc = faker.datatype.string(20);

    return questionInput;
  }
}
