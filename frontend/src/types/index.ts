export interface Author {
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
  author: Author;
  desc: string;
  realtimeShare: boolean;
  tags: TagType[];
  title: string;
  viewCount: number;
  thumbupCount: number;
}

export interface QuestionDetailType {
  id: number;
  __typename: string;
  author: Author;
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
  author: Author;
  desc: string;
  thumbupCount: number;
  createdAt: string;
}

export interface DetailType {
  desc: string;
  tags?: TagType[];
  thumbupCount: number;
  author: Author;
}

export interface Answer {
  id: number;
  userId: number;
  desc: string;
  thumbupCount: number;
  createdAt: string;
  state: 0 | 1;
  author: Author;
}
