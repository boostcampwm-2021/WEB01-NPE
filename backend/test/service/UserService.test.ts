import Container from "typedi";
import UserRepository from "../../src/repositories/User/UserRepository";
import UserService from "../../src/services/User/UserService";
import UserServiceImpl from "../../src/services/User/UserServiceImpl";
import faker from "faker";
import { User } from "../../src/entities/User";
import connection from "../connection";
import InjectionConfig from "../../src/InjectionConfig";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(async () => {
    userService = Container.get("UserService");
  });

  afterEach(async () => {
    await connection.clear();
  });

  beforeAll(async () => {
    await connection.connectIfNotExists();
    await connection.clear();
    InjectionConfig();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("신규 유저 회원가입", async () => {
    // given
    const newUser = new User();
    const id = faker.datatype.number();
    const username = faker.internet.userName();
    const profileUrl = faker.image.avatar();
    const socialUrl = faker.internet.url();
    newUser.id = id;
    newUser.username = username;
    newUser.profileUrl = profileUrl;
    newUser.socialUrl = socialUrl;

    // when
    const registeredUser = await userService.register(
      id,
      username,
      profileUrl,
      socialUrl
    );

    // then
    expect(registeredUser.id).toBe(id);
    expect(registeredUser.username).toBe(username);
    expect(registeredUser.profileUrl).toBe(profileUrl);
    expect(registeredUser.socialUrl).toBe(socialUrl);
  });
});
