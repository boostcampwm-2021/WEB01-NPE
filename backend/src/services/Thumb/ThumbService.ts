export default interface ThumbService {
  questionThumbUp(questionId: number, userId: number): Promise<boolean>;
  questionThumbDown(questionId: number, userId: number): Promise<boolean>;
  answerThumbUp(answerId: number, userId: number): Promise<boolean>;
  answerThumbDown(answerId: number, userId: number): Promise<boolean>;
}
