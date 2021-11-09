export interface Author {
  __typename: string;
  id: string;
  username: string;
  profileUrl: string;
  score: number;
}

export interface Tag {
  __typename: string;
  name: string;
}

export interface Question {
  id: number;
  __typename: string;
  author: Author;
  desc: string;
  realtimeShare: boolean;
  tags: Tag[];
  title: string;
  viewCount: number;
  thumbupCount: number;
}