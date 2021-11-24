import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { TagList, ProfileSummary, Vote } from "@components/molecules";
import { MDViewer } from "@components/atoms";
import { DetailType } from "@src/types";

interface Props {
  detail: DetailType;
}

const DetailBody: FunctionComponent<Props> = ({ detail }) => {
  const { id, thumbupCount, desc, tags, author } = detail;
  return (
    <Styled.DetailBody>
      <Styled.VoteContainer>
        <Vote
          id={Number(id)}
          thumbupCount={thumbupCount}
          isQuestion={tags !== undefined}
        />
      </Styled.VoteContainer>
      <Styled.DetailBodyInner>
        <Styled.DetailBodyDesc>
          <MDViewer content={desc} />
        </Styled.DetailBodyDesc>
        <Styled.DetailBodyInfo>
          <div>{tags && <TagList tags={tags} />}</div>
          <div>
            <ProfileSummary author={author} />
          </div>
        </Styled.DetailBodyInfo>
      </Styled.DetailBodyInner>
    </Styled.DetailBody>
  );
};

export default DetailBody;
