import React, { FunctionComponent } from "react";
import { Input, Label, Span } from "./styled";

interface Props {
  type: string;
  text: string;
  setText: (value: string) => void;
}

const TitleInput: FunctionComponent<Props> = ({ type, text, setText }) => {
  return (
    <>
      <Input required />
      <Label>
        <Span>제목을 입력하세요.</Span>
      </Label>
    </>
  );
};

export default TitleInput;
