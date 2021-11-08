import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  message: string;
  text: string;
}

const Text: FunctionComponent<Props> = ({ message, text }) => {
  return (
    <>
      {message === "profileHeader" && (
        <Styled.Span ellipsis={true} fontSize={12} fontWeight={"bold"}>
          {text}
        </Styled.Span>
      )}

      {message === "profileContent" && (
        <Styled.Span fontSize={10}>{text}</Styled.Span>
      )}
    </>
  );
};

export default Text;
