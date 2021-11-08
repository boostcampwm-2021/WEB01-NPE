import React, { FunctionComponent, useState } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";

interface Props {
  isOnline: boolean;
  text: string;
}

const QuestionTitle: FunctionComponent<Props> = ({ text, isOnline }) => {
  return (
    <Styled.QuestionTitle>
      <div className="text__container">
        <Atoms.TitleText text={text} />
      </div>
      <div className="indicator__conatier">
        <Atoms.Indicator isOnline={isOnline} />
      </div>
    </Styled.QuestionTitle>
  );
};

export default QuestionTitle;
