import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { TitleText, Indicator } from "@components/atoms";

interface Props {
  type: string;
  text: string;
}

const QuestionTitle: FunctionComponent<Props> = ({ type, text }) => {
  return (
    <Styled.QuestionTitle>
      <Styled.TextContainer>
        <TitleText text={text} type="Default" />
        <Styled.QuestionDate>
          questioned on 2021년 11월 11일
        </Styled.QuestionDate>
      </Styled.TextContainer>
      <Styled.IndicatorContainer>
        <Indicator type={type} />
      </Styled.IndicatorContainer>
    </Styled.QuestionTitle>
  );
};

export default QuestionTitle;
