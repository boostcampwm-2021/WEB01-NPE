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
  id: number;
  __typename: string;
  author: AuthorType;
  desc: string;
  realtimeShare: boolean;
  tags: TagType[];
  title: string;
  viewCount: number;
  thumbupCount: number;
  answerCount: number;
}

export interface QuestionDetailType {
  id: string;
  __typename: string;
  author: AuthorType;
  desc: string;
  realtimeShare: boolean;
  tags: TagType[];
  title: string;
  viewCount: number;
  thumbupCount: number;
  createdAt: string;
  score: number;
  answers: AnswerDetailType[];
}

export interface AnswerDetailType {
  id: string;
  author: AuthorType;
  desc: string;
  thumbupCount: number;
  createdAt: string;
}

export interface DetailType {
  desc: string;
  tags?: TagType[];
  thumbupCount: number;
  author: AuthorType;
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
