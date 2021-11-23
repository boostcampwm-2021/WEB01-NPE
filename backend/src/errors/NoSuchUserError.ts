export default class NoSuchUserError extends Error {
  constructor(message?: string) {
    super(`No such User! ${message ? `${message}` : ""}`);
    this.name = "NoSuchUserError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
