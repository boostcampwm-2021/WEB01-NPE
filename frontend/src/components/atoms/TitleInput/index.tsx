import React, { ChangeEvent, FunctionComponent, useRef } from "react";

import * as Styled from "./styled";

interface Props {
  type: string;
  setText: (value: string) => void;
}

const TitleInput: FunctionComponent<Props> = ({ type, setText }) => {
  const inputRef = useRef(null);
  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <Styled.Input ref={inputRef} onInput={onInput} required />
      <Styled.Label>
        <Styled.Span>제목을 입력하세요.</Styled.Span>
      </Styled.Label>
    </>
  );
};

export default TitleInput;
