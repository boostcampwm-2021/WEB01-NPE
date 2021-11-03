import React, { FunctionComponent } from "react";
import { StyledSearchResult } from "./styled";
import TitleText from "../../atoms/TitleText";
import ProfileSummary from "../../molecules/ProfileSummary";
import Indicator from "../../atoms/Indicator";
import SideTag from "../../atoms/SideTag";
import Image from "../../atoms/Image";

interface tagData {
  text: string;
  deleteHandler: () => void;
}
interface Props {
  title: string;
  markdown: string;
  tagDatas: Array<tagData>;
  views: number;
}

const SearchResult: FunctionComponent<Props> = ({
  title,
  markdown,
  tagDatas,
  views,
}) => {
  return (
    <StyledSearchResult>
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
            <Indicator type={false} width={"30px"} height={"30px"} />
          </div>
        </div>
        <div className="markdown-container">{markdown}</div>
        <div className="tag-container">
          {tagDatas.map((tagData) => {
            return (
              <SideTag
                text={tagData.text}
                deleteHandler={tagData.deleteHandler}
              />
            );
          })}
        </div>
        <div className="views-comment-container">
          <div className="views-container">
            <Image
              src={"/views.png"}
              width={30}
              height={30}
              alt="views image"
            />
            <p>{views}</p>
          </div>
          <div className="comment-container">
            <Image
              src={"/views.png"}
              width={30}
              height={30}
              alt="views image"
            />
            <p>32</p>
          </div>
        </div>
      </div>
    </StyledSearchResult>
  );
};

export default SearchResult;
