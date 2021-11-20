import React, { FunctionComponent, useEffect, useState } from "react";

import * as Styled from "./styled";
import { SideTag, Switch, TitleText } from "@components/atoms";
import { TagSearch } from "@components/molecules";
import { getAllTags } from "@src/lib";
import { TagType } from "@src/types";

interface Props {
  selectedTags: TagType[];
  setSelectedTags: (value: TagType[]) => void;
  isLive: boolean;
  setIsLive: (value: boolean) => void;
}

const SideBar: FunctionComponent<Props> = ({
  selectedTags,
  setSelectedTags,
  isLive,
  setIsLive,
}) => {
  const [allTagList, setAllTagList] = useState<TagType[]>([]);

  const onSubmit = (newTag: TagType) => {
    setSelectedTags([...selectedTags, newTag]);
  };
  const onDelete = (deletedTag: string): void => {
    setSelectedTags(selectedTags.filter((tag) => tag.name !== deletedTag));
  };

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await getAllTags();
      if (data) {
        setAllTagList(data.getAllTags);
      }
    };
    fetchTags();
  }, []);

  return (
    <Styled.Container>
      <TagSearch tagList={allTagList} onSubmit={onSubmit} />
      <Styled.LiveContainer>
        <TitleText type="Default" text="실시간 답변" />
        <Switch type="Default" isChecked={isLive} setIsChecked={setIsLive} />
      </Styled.LiveContainer>
      <Styled.UlTags>
        {selectedTags.map((tag) => (
          <SideTag type="Default" text={tag.name} onDelete={onDelete} />
        ))}
      </Styled.UlTags>
    </Styled.Container>
  );
};

export default SideBar;
