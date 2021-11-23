export default class NoSuchUserError extends Error {
  constructor(message?: string) {
    super(`NoSuchUserError / ${message ?? ""}`);
    this.name = "NoSuchUserError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
