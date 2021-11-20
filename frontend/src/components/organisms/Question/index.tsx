import React, { FunctionComponent, MouseEventHandler } from "react";
import Link from "next/link";

import * as Styled from "./styled";
import {
  ProfileSummary,
  QuestionTitle,
  TagList,
  ViewsAndComment,
} from "@components/molecules";
import { MDViewer } from "@components/atoms";
import { QuestionType } from "@src/types";

interface Props {
  question: QuestionType;
  showProfile?: boolean;
}

const SearchResult: FunctionComponent<Props> = ({
  question,
  showProfile = true,
}) => {
  const onClick: MouseEventHandler = () => {};

  const {
    id,
    title,
    realtimeShare,
    author,
    desc,
    tags,
    viewCount,
    thumbupCount,
  } = question;
  return (
    <Styled.Question>
      {showProfile ? (
        <Styled.LeftContainer>
          <ProfileSummary author={author} />
        </Styled.LeftContainer>
      ) : (
        ""
      )}

      <Styled.RightContainer>
        <Styled.HeaderContainer>
          <Link href={`question/${id}`}>
            <a>
              <QuestionTitle
                text={title}
                type={realtimeShare ? "online" : "offline"}
              />
            </a>
          </Link>
        </Styled.HeaderContainer>
        <Styled.DescriptContainer>
          <MDViewer content={desc} />
        </Styled.DescriptContainer>
        <Styled.TagContainer>
          <TagList tags={tags} />
        </Styled.TagContainer>

        <Styled.QusetionDetail>
          <ViewsAndComment viewCount={viewCount} commentCount={thumbupCount} />
        </Styled.QusetionDetail>
      </Styled.RightContainer>
    </Styled.Question>
  );
};

export default SearchResult;
