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
        <Link href={`question/${id}`}>
          <a>
            <Molecule.QuestionTitle
              text={title}
              type={realtimeShare ? "online" : "offline"}
            />
          </a>
        </Link>

        <Styled.QusetionDetail>
          <Molecule.ViewsAndComment
            viewCount={viewCount}
            commentCount={thumbupCount}
          />
          <Molecule.TagList tags={tags} />
        </Styled.QusetionDetail>

        {desc}
      </Styled.RightContainer>
    </Styled.Question>
  );
};

export default SearchResult;
