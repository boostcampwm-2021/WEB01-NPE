import { thumbDownQuestion, thumbUpQuestion } from "@src/lib";
import React, { FunctionComponent, useState } from "react";

import * as Styled from "./styled";

interface Props {
  id: number;
  thumbupCount: number;
}

const Vote: FunctionComponent<Props> = (props: Props) => {
  const id = props.id;
  const thumbUpCount_prop = props.thumbupCount;
  const [thumbUpCount, setThumbUpCount] = useState(thumbUpCount_prop);

  const onThumbUpClick = async () => {
    const result = (await thumbUpQuestion(id)).data.thumbUpQuestion;

    if (result) {
      setThumbUpCount((prev) => prev + 1);
    } else {
      window.alert("이미 평가한 글입니다");
    }
  };

  const onThumbDownClick = async () => {
    const result = (await thumbDownQuestion(id)).data.thumbDownQuestion;

    if (result) {
      setThumbUpCount((prev) => prev - 1);
    } else {
      window.alert("이미 평가한 글입니다");
    }
  };

  return (
    <>
      <Styled.Vote>
        <Styled.UpArrowDiv>
          <svg
            aria-hidden="true"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            onClick={onThumbUpClick}
          >
            <path d="M2 26h32L18 10 2 26Z"></path>
          </svg>
        </Styled.UpArrowDiv>
        <Styled.ThubmUpDiv>{thumbUpCount}</Styled.ThubmUpDiv>
        <Styled.DownArrowDiv>
          <svg
            aria-hidden="true"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            onClick={onThumbDownClick}
          >
            <path d="M2 10h32L18 26 2 10Z"></path>
          </svg>
        </Styled.DownArrowDiv>
      </Styled.Vote>
    </>
  );
};

export default Vote;
