import React, { FunctionComponent, useState } from "react";
import { SideTag, Switch } from "../../atoms";
import TitleText from "../../atoms/TitleText";
import { TagSearch } from "../../molecules";
import * as Styled from "./styled";

interface Props {
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
}

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
      <TagSearch onSubmit={onSubmit} />
      <Styled.LiveContainer>
        <TitleText text="실시간 답변" />
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
