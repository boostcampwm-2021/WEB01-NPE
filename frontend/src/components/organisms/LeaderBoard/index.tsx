import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

import * as Styled from "./styled";
import { AuthorType } from "@src/types";
import trophyImg from "./trophy.svg";
import questionImg from "./question.svg";
import thumbsupImg from "./thumbsup.svg";
import router from "next/router";

interface QuestionType {
  title: string;
  thumbupCount: number;
  id: number;
}

interface Props {
  userRank: AuthorType[];
  questionRank: QuestionType[];
}

const LeaderBoard: FunctionComponent<Props> = ({ userRank, questionRank }) => {
  const showRanker = (user: AuthorType, index: number) => {
    return (
      <Styled.Ranker
        key={index}
        onClick={() => router.push(`profile/${user.id}`)}
      >
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
  const showQuestion = (question: QuestionType, index: number) => {
    return (
      <Styled.Question
        key={index}
        onClick={() => router.push(`question/${question.id}`)}
      >
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
          <Styled.RankerList>{userRank.map(showRanker)}</Styled.RankerList>
        </Styled.RankingContainer>

        <Styled.QuestionsContainer>
          <Styled.Questions>
            <Styled.QuestionHeader>
              <Styled.Icon>
                <Image src={questionImg} width={15} height={15} />
              </Styled.Icon>
              <Styled.QuestionHead>인기 질문</Styled.QuestionHead>
            </Styled.QuestionHeader>
            {questionRank.map(showQuestion)}
          </Styled.Questions>
        </Styled.QuestionsContainer>
      </Styled.Container>
    </Styled.WrappedContainer>
  );
};

export default LeaderBoard;
