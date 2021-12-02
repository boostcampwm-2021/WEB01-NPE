import Container from "typedi";
import UserService from "../../src/services/User/UserService";
import faker from "faker";
import { User } from "../../src/entities/User";
import connection from "../connection";
import InjectionConfig from "../../src/InjectionConfig";
import { TransactionalTestContext } from "typeorm-transactional-tests";
import { Connection, EntityManager } from "typeorm";
import UserMock from "../mockdata/userMock";

describe("UserService", () => {
  let userService: UserService;
  let conn: Connection;
  let transactionalContext: TransactionalTestContext;
  let entityManager: EntityManager;

  beforeEach(async () => {
    userService = Container.get("UserService");
    transactionalContext = new TransactionalTestContext(conn);
    await transactionalContext.start();
    entityManager = conn.manager;
  });

  afterEach(async () => {
    await transactionalContext.finish();
  });

  beforeAll(async () => {
    conn = await connection.connectIfNotExists();
    InjectionConfig();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("신규 유저 회원가입", async () => {
    // given
    const newUser = new UserMock().getOne();
    const { id, username, profileUrl, socialUrl } = newUser;

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
