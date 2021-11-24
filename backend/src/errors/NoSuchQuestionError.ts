export default class NoSuchQuestionError extends Error {
  constructor(message?: string) {
    super(`NoSuchQuestionError / ${message ?? ""}`);
    this.name = "NoSuchQuestionError";
    this.stack = `${this.message}\n${new Error().stack}`;
  }
}
