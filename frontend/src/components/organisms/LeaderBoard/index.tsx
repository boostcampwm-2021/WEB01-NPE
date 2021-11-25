import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

import * as Styled from "./styled";
import trophyImg from "./trophy.svg";
import questionImg from "./question.svg";
import thumbsupImg from "./thumbsup.svg";

const rankers = [
  {
    profileUrl: "https://avatars.githubusercontent.com/u/49035066?s=40&v=4",
    username: "안승재",
    score: 99,
  },

  {
    profileUrl: "https://avatars.githubusercontent.com/u/49035066?s=40&v=4",
    username: "hwangwoojin",
    score: 99,
  },
  {
    profileUrl: "https://avatars.githubusercontent.com/u/49035066?s=40&v=4",
    username: "hwangwoojin",
    score: 99,
  },
  {
    profileUrl: "https://avatars.githubusercontent.com/u/49035066?s=40&v=4",
    username: "hwangwoojin",
    score: 99,
  },
  {
    profileUrl: "https://avatars.githubusercontent.com/u/49035066?s=40&v=4",
    username: "hwangwoojin",
    score: 99,
  },
];

const questions = [
  { title: "자바스크립트 문자열 재업 2", thumbupCount: 1 },
  { title: "자바스크립트 문자열 재업 2", thumbupCount: 1 },
  { title: "자바스크립트 문자열 재업 2", thumbupCount: 1 },
  { title: "자바스크립트 문자열 재업 2", thumbupCount: 1 },
  { title: "자바스크립트 문자열 재업 2", thumbupCount: 1 },
];

const LeaderBoard: FunctionComponent = () => {
  const showRanker = (user, index) => {
    return (
      <Styled.Ranker key={index}>
        <Styled.RankerProfile>
          <Styled.RankerNumber>{index + 1}</Styled.RankerNumber>
          <Styled.RankerImage>
            <Image src={user.profileUrl} width={27} height={27} />
          </Styled.RankerImage>
          <Styled.RankerName>{user.username}</Styled.RankerName>
        </Styled.RankerProfile>
        <Styled.RankerScore>{user.score}</Styled.RankerScore>
      </Styled.Ranker>
    );
  };
  const showQuestion = (question, index) => {
    return (
      <Styled.Question key={index}>
        <Styled.QuestionTitle>{question.title}</Styled.QuestionTitle>
        <Styled.QuestionThumbsUp>
          <Styled.Icon>
            <Image src={thumbsupImg} width={15} height={15} />
          </Styled.Icon>
          {question.thumbupCount}
        </Styled.QuestionThumbsUp>
      </Styled.Question>
    );
  };

  return (
    <Styled.WrappedContainer>
      <Styled.Container>
        <Styled.RankingContainer>
          <Styled.RankingHeader>
            <Styled.Icon>
              <Image src={trophyImg} width={15} height={15} />
            </Styled.Icon>
            RANKING
          </Styled.RankingHeader>
          <Styled.RankerList>{rankers.map(showRanker)}</Styled.RankerList>
        </Styled.RankingContainer>

        <Styled.QuestionsContainer>
          <Styled.Questions>
            <Styled.QuestionHeader>
              <Styled.Icon>
                <Image src={questionImg} width={15} height={15} />
              </Styled.Icon>
              <Styled.QuestionHead>인기 질문</Styled.QuestionHead>
            </Styled.QuestionHeader>
            {questions.map(showQuestion)}
          </Styled.Questions>
        </Styled.QuestionsContainer>
      </Styled.Container>
    </Styled.WrappedContainer>
  );
};

export default LeaderBoard;
