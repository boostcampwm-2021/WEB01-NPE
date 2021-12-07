import { User } from "../../../src/entities/User";
import Mock from "./mock";
import faker from "faker";

export default class UserMock implements Mock<User> {
  getOne() {
    const user = new User();
    user.id = faker.datatype.number();
    user.username = faker.internet.userName();
    user.score = faker.datatype.number({ min: 0, max: 2000 });
    user.profileUrl = faker.image.avatar();
    user.socialUrl = faker.internet.url();

    return user;
  }

  getMany(count: number) {
    const users: User[] = [];
    for (let i = 0; i < count; i++) users.push(this.getOne());

    return users;
  }
}
