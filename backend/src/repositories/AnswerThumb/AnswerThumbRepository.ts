export default interface AnswerThumbRepository {
  deleteByAnswerId(answerId: number): Promise<void>;
  exists(answerId: number, userId: number): Promise<boolean>;
}
