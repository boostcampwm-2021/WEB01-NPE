import React, { FunctionComponent } from "react";

import * as Styled from "./styled";

interface Props {
  type: string;
  text: string;
  setText: (value: string) => void;
}

const TitleInput: FunctionComponent<Props> = ({ type, text, setText }) => {
  return (
    <>
      <Styled.Input required />
      <Styled.Label>
        <Styled.Span>제목을 입력하세요.</Styled.Span>
      </Styled.Label>
    </>
  );
};

export default TitleInput;
