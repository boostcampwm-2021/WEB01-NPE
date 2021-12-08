import "reflect-metadata";
import UserDto from "@src/dto/UserDto";
import { User } from "@src/entities/User";
import UserRepositoryImpl from "@src/repositories/User/UserRepositoryImpl";
import { when } from "jest-when";

describe("UserRepository", () => {
  let instance: UserRepositoryImpl;

  beforeEach(() => {
    // 인스턴스 초기화
    instance = new UserRepositoryImpl();
  });

  it("findById", async () => {
    // given
    const USER_ID = 1;
    const user = new User();
    user.id = USER_ID;
    user.username = "David";

    instance.findOne = jest.fn();

    // when
    await instance.findById(USER_ID);

    // then
    expect(instance.findOne).toBeCalledWith({ id: USER_ID });
    expect(instance.findOne).toBeCalledTimes(1);
  });

  it("findByUsername", async () => {
    // given
    const USER_USERNAME = "David";
    const user = new User();
    user.id = 1;
    user.username = USER_USERNAME;

    instance.findOne = jest.fn();

    // when
    await instance.findByUsername(USER_USERNAME);

    // then
    expect(instance.findOne).toBeCalledWith({ username: USER_USERNAME });
    expect(instance.findOne).toBeCalledTimes(1);
  });

  it("addNew", async () => {
    // given
    const userDto = new UserDto();
    userDto.id = 1;
    userDto.username = "David";
    userDto.profileUrl = "www.naver.com";
    userDto.socialUrl = "www.github.com";

    instance.save = jest.fn().mockImplementation((user: User) => user);

    // when
    const resultUser = await instance.addNew(userDto);

    // then
    expect(resultUser.id).toBe(userDto.id);
    expect(resultUser.username).toBe(userDto.username);
    expect(resultUser.profileUrl).toBe(userDto.profileUrl);
    expect(resultUser.socialUrl).toBe(userDto.socialUrl);
  });

  it("findAndOrderByScoreDesc", async () => {
    // given
    const TAKE = 5;

    instance.find = jest.fn();

    // when
    await instance.findAndOrderByScoreDesc(TAKE);

    // then
    expect(instance.find).toBeCalledWith({
      take: TAKE,
      order: { score: "DESC" },
    });
  });
});
