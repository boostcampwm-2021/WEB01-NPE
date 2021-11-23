import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

import * as Styled from "./styled";
import { SideTag, Switch } from "@components/atoms";
import { TagSearch } from "@components/molecules";
import { getAllTags } from "@src/lib";
import { TagType } from "@src/types";
import filterImg from "./filter.svg";
import tagImg from "./hashtag.svg";
import liveImg from "./live.svg";
import tagsImg from "./tags.svg";
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
      <Styled.Header>
        <Styled.HeaderText>
          <Styled.Icon>
            <Image src={filterImg} width={12} height={12} />
          </Styled.Icon>
          검색 필터링
        </Styled.HeaderText>
      </Styled.Header>
      <Styled.InputContainer>
        <Styled.InputLabel>
          <Styled.Icon>
            <Image src={tagImg} width={14} height={14} />
          </Styled.Icon>
          태그 추가
        </Styled.InputLabel>
        <TagSearch tagList={allTagList} onSubmit={onSubmit} />
      </Styled.InputContainer>
      <Styled.SwitchContainer>
        <Styled.InputLabel>
          <Styled.Icon>
            <Image src={liveImg} width={14} height={14} />
          </Styled.Icon>
          실시간 답변
        </Styled.InputLabel>
        <Switch type="Default" isChecked={isLive} setIsChecked={setIsLive} />
      </Styled.SwitchContainer>
      <Styled.Divider>
        <Styled.Icon>
          <Image src={tagsImg} width={18} height={15} />
        </Styled.Icon>
        선택된 태그 목록({selectedTags.length})
      </Styled.Divider>
      <Styled.UlTags>
        {selectedTags.map((tag) => (
          <SideTag type="Default" text={tag.name} onDelete={onDelete} />
        ))}
      </Styled.UlTags>
    </Styled.Container>
  );
};

export default SideBar;
