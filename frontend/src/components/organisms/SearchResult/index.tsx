import React, { FunctionComponent, MouseEventHandler } from "react";

import * as Styled from "./styled";
import { TitleText, Indicator, Tag, IconWithNumber } from "../../atoms";
import { ProfileSummary } from "../../molecules";
interface tag {
  label: string;
  onClick: MouseEventHandler;
}
interface Props {
  title: string;
  markdown: string;
  tags: Array<tag>;
  views: number;
  comments: number;
}

const SearchResult: FunctionComponent<Props> = ({
  title,
  markdown,
  tags,
  views,
  comments,
}) => {
  return (
    <Styled.SearchResult>
      <div className="profile-container">
        <div className="profile-container__profile">
          <ProfileSummary
            src={"https://avatars.githubusercontent.com/u/67536413"}
            name={"hwangwoojin"}
            rank={"master"}
          />
        </div>
      </div>
      <div className="content-container">
        <div className="title-container">
          <TitleText text={title} />
          <div className="title-container__indicator">
            <Indicator type={"offline"} width={"30px"} height={"30px"} />
          </div>
        </div>
        <div className="markdown-container">{markdown}</div>
        <div className="tag-container">
          {tags.map((tag, index) => {
            return (
              <Tag
                type="Default"
                label={tag.label}
                onClick={tag.onClick}
                key={index}
              />
            );
          })}
        </div>
        <div className="views-comment-container">
          <div className="views-container">
            <IconWithNumber type="Views" value={views} />
          </div>
          <div className="comment-container">
            <IconWithNumber type="Comments" value={comments} />
          </div>
        </div>
      </div>
    </Styled.SearchResult>
  );
};

export default SearchResult;
