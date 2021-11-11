import React, { FunctionComponent, MouseEventHandler } from "react";
import Link from "next/link";

import * as Styled from "./styled";
import * as Molecule from "../../molecules";
import * as Organism from "../index";
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
        <Molecule.ProfileSummary
          src={"https://avatars.githubusercontent.com/u/67536413"}
          name={author.username}
          rank={author.score.toString()}
        />
      </Styled.LeftContainer>

      <Styled.RightContainer>
        <Styled.HeaderContainer>
          <Link href={`question/${id}`}>
            <a>
              <Molecule.QuestionTitle
                text={title}
                type={realtimeShare ? "online" : "offline"}
              />
            </a>
          </Link>
        </Styled.HeaderContainer>
        <Styled.DescriptContainer>{desc}</Styled.DescriptContainer>
        <Styled.TagContainer>
          <Molecule.TagList tags={tags} />
        </Styled.TagContainer>

        <Styled.QusetionDetail>
          <Molecule.ViewsAndComment
            viewCount={viewCount}
            commentCount={thumbupCount}
          />
        </Styled.QusetionDetail>
      </Styled.RightContainer>
    </Styled.Question>
  );
};

export default SearchResult;
