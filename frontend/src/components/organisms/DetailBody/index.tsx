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
        <Styled.DetailBodyDesc>{desc}</Styled.DetailBodyDesc>
        <Styled.DetailBodyInfo>
          <Styled.TagListContainer>
            {tags && <TagList tags={tags} />}
          </Styled.TagListContainer>
          <Styled.ProfileContainer>
            <ProfileSummary author={author} />
          </Styled.ProfileContainer>
        </Styled.DetailBodyInfo>
      </Styled.DetailBodyInner>
    </Styled.DetailBody>
  );
};

export default DetailBody;
