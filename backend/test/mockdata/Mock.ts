export default interface Mock<T> {
  getOne(): T;
  getMany(count: number): T[];
}
