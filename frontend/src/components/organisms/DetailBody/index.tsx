import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { TagList, ProfileSummary, Vote } from "@components/molecules";
import { DetailType } from "@src/types";

interface Props {
  detail: DetailType;
}

const DetailBody: FunctionComponent<Props> = ({ detail }) => {
  const { thumbupCount, desc, tags, author } = detail;
  return (
    <Styled.DetailBody>
      <Styled.VoteContainer>
        <Vote thumbupCount={thumbupCount} />
      </Styled.VoteContainer>

      <Styled.DetailBodyInner>
        <Styled.DetailBodyDesc>
          <div>{desc}</div>
        </Styled.DetailBodyDesc>

        {tags && (
          <Styled.TagContainer>
            <TagList tags={tags} />
          </Styled.TagContainer>
        )}

        <ProfileSummary author={author} />
      </Styled.DetailBodyInner>
    </Styled.DetailBody>
  );
};

export default DetailBody;
