export default class CommonError extends Error {
  constructor(message?: string) {
    super(`CommonError / ${message ?? ""}`);
    this.name = "CommonError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
