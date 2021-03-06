import { Socket } from "socket.io-client";

export interface AuthorType {
  __typename: string;
  id: string;
  username: string;
  profileUrl: string;
  score: number;
}

export interface TagType {
  __typename: string;
  id: string;
  name: string;
}

export interface QuestionType {
  id: number | string;
  __typename: string;
  author: AuthorType;
  desc: string;
  realtimeShare: boolean;
  tags: TagType[];
  title: string;
  viewCount: number;
  thumbupCount: number;
  createdAt: string;
  answerCount: number;
}

export interface QuestionDetailType extends QuestionType {
  id: string;
  score: number;
  answers: AnswerDetailType[];
  adopted: boolean;
}

export interface DetailType {
  id: number;
  desc: string;
  tags?: TagType[];
  thumbupCount: number;
  author: AuthorType;
}

export interface AnswerDetailType extends DetailType {
  createdAt: string;
  state: 0 | 1;
}

export interface AnswerType {
  id: number;
  userId: number;
  desc: string;
  thumbupCount: number;
  createdAt: string;
  state: 0 | 1;
  author: AuthorType;
}
