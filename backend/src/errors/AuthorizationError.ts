export default class AuthorizationError extends Error {
  constructor(message?: string) {
    super(`AuthorizationError / ${message ?? ""}`);
    this.name = "AuthorizationError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
