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
        <Molecule.ProfileSummary author={author} />
      </Styled.LeftContainer>

      <Styled.RightContainer>
        <Link href={`question/${id}`}>
          <a>
            <Molecule.QuestionTitle
              text={title}
              realtimeShare={realtimeShare}
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

// <div className="title-container__indicator">
//         <Link href={`/question/${id}`}>
//           <a>
//             <Atom.TitleText type={"Default"} text={title} />
//           </a>
//         </Link>
//         <Atom.Indicator type={realtimeShare ? "online" : "offline"} />
//       </div>
//       <div className="markdown-container">{desc}</div>
//       <div className="tag-container">
//         {tags.map((tag: Type.Tag, index: number) => {
//           return (
//             <Atom.Tag
//               type="Default"
//               key={index}
//               name={tag.name}
//               onClick={onClick}
//             />
//           );
//         })}
//       </div>
//       <div>
//         댓글수{viewCount}
//         좋아요수{thumbupCount}
//       </div>

export default SearchResult;
