import React, { FunctionComponent, useState } from "react";
import { SideTag, Switch } from "../../atoms";
import TitleText from "../../atoms/TitleText";
import { TagSearch } from "../../molecules";
import * as Styled from "./styled";

interface Props {
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
}

const tagList = [
  "react.js",
  "javascript",
  "react-router-dom",
  "java",
  "vue.js",
  "angular.js",
  "python",
  "C++",
];

const SideBar: FunctionComponent<Props> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const [isLive, setIsLive] = useState<boolean>(false);
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
        <TitleText text="실시간 답변" />
        <Switch
          isChecked={isLive}
          setIsChecked={setIsLive}
          offColor="#66bb6a"
          onColor="#ccc"
        />
      </Styled.LiveContainer>
      <Styled.UlTags>
        {selectedTags.map((tag) => (
          <SideTag text={tag} onDelete={onDelete} />
        ))}
      </Styled.UlTags>
    </Styled.Container>
  );
};

export default SideBar;
