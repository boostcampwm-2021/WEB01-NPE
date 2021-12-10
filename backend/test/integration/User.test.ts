import Container from "typedi";
import UserService from "@src/services/User/UserService";
import connection from "./connection";
import InjectionConfig from "@src/InjectionConfig";
import { TransactionalTestContext } from "typeorm-transactional-tests";
import { Connection, EntityManager } from "typeorm";
import UserMock from "./mockdata/userMock";
import UserDto from "@src/dto/UserDto";

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
    const userDto = new UserDto();
    userDto.id = newUser.id;
    userDto.profileUrl = newUser.profileUrl;
    userDto.socialUrl = newUser.socialUrl;
    userDto.username = newUser.username;

    // when
    const registeredUser = await userService.register(userDto);

    // then
    expect(registeredUser.id).toBe(id);
    expect(registeredUser.username).toBe(username);
    expect(registeredUser.profileUrl).toBe(profileUrl);
    expect(registeredUser.socialUrl).toBe(socialUrl);
  });
});
