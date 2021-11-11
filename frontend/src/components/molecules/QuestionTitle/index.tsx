import React, { FunctionComponent, useState } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";

interface Props {
  type: string;
  text: string;
}

const QuestionTitle: FunctionComponent<Props> = ({ text, type }) => {
  return (
    <Styled.QuestionTitle>
      <Styled.TextContainer>
        <Atoms.TitleText text={text} type="Default" />
        <Styled.QuestionDate>
          questioned on 2021년 11월 11일
        </Styled.QuestionDate>
      </Styled.TextContainer>
      <div className="indicator__conatier">
        <Atoms.Indicator type={type} />
      </div>
    </Styled.QuestionTitle>
  );
};

export default QuestionTitle;
