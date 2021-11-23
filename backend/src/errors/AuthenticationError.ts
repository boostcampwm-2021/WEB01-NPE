export default class AuthenticationError extends Error {
  constructor(message?: string) {
    super(`AuthenticationError / ${message ?? ""}`);
    this.name = "AuthenticationError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
