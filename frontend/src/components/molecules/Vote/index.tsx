import React, { FunctionComponent } from "react";

import * as Styled from "./styled";

interface Props {
  thumbupCount: number;
}

const Vote: FunctionComponent<Props> = ({ thumbupCount }) => {
  return (
    <>
      <Styled.Vote>
        <Styled.UpArrowDiv>
          <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
            <path d="M2 26h32L18 10 2 26Z"></path>
          </svg>
        </Styled.UpArrowDiv>
        <Styled.ThubmUpDiv>{thumbupCount}</Styled.ThubmUpDiv>
        <Styled.DownArrowDiv>
          <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
            <path d="M2 10h32L18 26 2 10Z"></path>
          </svg>
        </Styled.DownArrowDiv>
      </Styled.Vote>
    </>
  );
};

export default Vote;
