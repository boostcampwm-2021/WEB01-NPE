import TagRepositoryImpl from "@src/repositories/Tag/TagRepositoryImpl";

describe("TagRepository", () => {
  let instance: TagRepositoryImpl;

  beforeEach(() => {
    // 인스턴스 초기화
    instance = new TagRepositoryImpl();
  });

  it("findAll", async () => {
    // given
    instance.find = jest.fn();

    // when
    await instance.findAll();

    // then
    expect(instance.find).toBeCalledWith();
    expect(instance.find).toBeCalledTimes(1);
  });

  it("findById", async () => {
    // given
    const TAG_ID = 1;

    instance.findOne = jest.fn();

    // when
    await instance.findById(TAG_ID);

    // then
    expect(instance.findOne).toBeCalledWith({ id: TAG_ID });
    expect(instance.findOne).toBeCalledTimes(1);
  });

  it("findByName", async () => {
    // given
    const TAG_NAME = "TAGTAG";

    instance.findOne = jest.fn();

    // when
    await instance.findByName(TAG_NAME);

    // then
    expect(instance.findOne).toBeCalledWith({ name: TAG_NAME });
    expect(instance.findOne).toBeCalledTimes(1);
  });

  it("findByIds 빈 배열로 호출", async () => {
    // given
    const IDS: number[] = [];

    instance.find = jest.fn();

    // when
    const result = await instance.findByIds(IDS);

    // then
    expect(result).toStrictEqual([]);
    expect(instance.find).not.toBeCalled();
  });

  it("findByIds", async () => {
    // given
    const IDS = [1, 2];

    instance.find = jest.fn();

    // when
    await instance.findByIds(IDS);

    // then
    expect(instance.find).toBeCalledWith({ where: [{ id: 1 }, { id: 2 }] });
    expect(instance.find).toBeCalledTimes(1);
  });
});
