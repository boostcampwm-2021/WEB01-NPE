import React, { FunctionComponent, useState } from "react";

import * as Styled from "./styled";
import { SideTag, Switch, TitleText } from "@components/atoms";
import { TagSearch } from "@components/molecules";

interface Props {
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  tagList: string[];
  isLive: boolean;
  setIsLive: (value: boolean) => void;
}

const SideBar: FunctionComponent<Props> = ({
  selectedTags,
  setSelectedTags,
  tagList,
  isLive,
  setIsLive,
}) => {
  const onSubmit = (newTag: string) => {
    setSelectedTags([...selectedTags, newTag]);
  };
  const onDelete = (deletedTag: string): void => {
    setSelectedTags((preTags: string[]): string[] =>
      preTags.filter((preTag: string) => preTag !== deletedTag)
    );
  };
  return (
    <Styled.Container>
      <TagSearch tagList={tagList} onSubmit={onSubmit} />
      <Styled.LiveContainer>
        <TitleText type="Default" text="실시간 답변" />
        <Switch type={"SideBar"} isChecked={isLive} setIsChecked={setIsLive} />
      </Styled.LiveContainer>
      <Styled.UlTags>
        {selectedTags.map((tag) => (
          <SideTag type={"Default"} text={tag} onDelete={onDelete} />
        ))}
      </Styled.UlTags>
    </Styled.Container>
  );
};

export default SideBar;
