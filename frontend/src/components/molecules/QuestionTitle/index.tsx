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
      <div className="text__container">
        <Atoms.TitleText text={text} type="Default" />
      </div>
      <div className="indicator__conatier">
        <Atoms.Indicator type={type} />
      </div>
    </Styled.QuestionTitle>
  );
};

export default QuestionTitle;
