import { getConnection } from "typeorm";
import { Container, Service } from "typedi";
import { QuestionThumb } from "../../entities/QuestionThumb";
import { AnswerThumb } from "../../entities/AnswerThumb";
import AnswerRepository from "../../repositories/Answer/AnswerRepository";
import AnswerThumbRepository from "../../repositories/AnswerThumb/AnswerThumbRepository";
import QuestionRepository from "../../repositories/Question/QuestionRepository";
import QuestionThumbRepository from "../../repositories/QuestionThumb/QuestionThumbRepository";

export default interface ThumbService {
  questionThumbUp(questionId: number, userId: number): Promise<boolean>;
  questionThumbDown(questionId: number, userId: number): Promise<boolean>;
  answerThumbUp(answerId: number, userId: number): Promise<boolean>;
  answerThumbDown(answerId: number, userId: number): Promise<boolean>;
}
