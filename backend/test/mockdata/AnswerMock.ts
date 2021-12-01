import { PostAnswer } from "../../src/entities/PostAnswer";
import Mock from "./mock";
import faker from "faker";

export default class AnswerMock implements Mock<PostAnswer> {
  getOne() {
    const answer = new PostAnswer();
    answer.desc = faker.datatype.string(20);
    answer.createdAt = new Date();

    return answer;
  }

  getMany(count: number) {
    const answers: PostAnswer[] = [];
    for (let i = 0; i < count; i++) answers.push(this.getOne());

    return answers;
  }
}
