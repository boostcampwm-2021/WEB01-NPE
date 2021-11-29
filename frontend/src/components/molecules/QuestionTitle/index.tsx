import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { TitleText, Indicator } from "@components/atoms";

interface Props {
  type: string;
  text: string;
  createdAt: string;
}

const dateToString = (createdAt: string) => {
  const date = new Date(createdAt);
  return `questioned on ${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;
};

const QuestionTitle: FunctionComponent<Props> = ({ type, text, createdAt }) => {
  return (
    <Styled.QuestionTitle>
      <Styled.TextContainer>
        <TitleText text={text} type="Default" />
        <Styled.QuestionDate>{dateToString(createdAt)}</Styled.QuestionDate>
      </Styled.TextContainer>
      <Styled.IndicatorContainer>
        <Indicator type={type} />
      </Styled.IndicatorContainer>
    </Styled.QuestionTitle>
  );
};

export default QuestionTitle;
