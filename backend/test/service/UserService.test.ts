import testInjectionConfig from "../testInjectionConfig";
import UserService from "../../src/services/UserService";
import Container from "typedi";
import { User } from "../../src/entities/User";
import UserRepository from "../../src/repositories/UserRepository";
import connection from "../connection";
import { Connection } from "typeorm";

describe("UserService", () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let conn: Connection;

  beforeAll(async () => {
    conn = await connection.connectIfNotExists();

    testInjectionConfig();
    userService = Container.get("UserService");
    userRepository = Container.get("UserReposiory");
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("register new User", async () => {
    // given
    const spyUser = new User();
    spyUser.id = 1;
    spyUser.username = "david";
    spyUser.socialUrl = "abc.com";
    spyUser.profileUrl = "abc.com";
    spyUser.score = 0;
    spyOn(userRepository, "findById").and.returnValue(Promise.resolve(spyUser));

    // when
    const user = await userService.findById(1);

    // then
    expect(user.username).toBe("david");
  });
});
