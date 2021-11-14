import React, { FunctionComponent, MouseEventHandler } from "react";
import Link from "next/link";

import * as Styled from "./styled";
import {
  ProfileSummary,
  QuestionTitle,
  TagList,
  ViewsAndComment,
} from "@components/molecules";
import * as Type from "../../../types";

interface Props {
  question: Type.Question;
}

const SearchResult: FunctionComponent<Props> = ({ question }) => {
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
      <Styled.LeftContainer>
        <ProfileSummary author={author} />
      </Styled.LeftContainer>

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
        <Styled.DescriptContainer>{desc}</Styled.DescriptContainer>
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
