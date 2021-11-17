import React, { FunctionComponent, useEffect, useState } from "react";

import * as Styled from "./styled";
import { TagSearch } from "@components/molecules";
import { Tag } from "@components/atoms";
import { getAllTags } from "@src/lib";
import { TagType } from "@src/types";

interface Props {
  tagList: TagType[];
  setTagList: (value: TagType[]) => void;
}

const candidates = [
  "react.js",
  "javascript",
  "react-router-dom",
  "java",
  "vue.js",
  "angular.js",
  "python",
  "C++",
];

const TagInput: FunctionComponent<Props> = ({ tagList, setTagList }) => {
  const [allTagList, setAllTagList] = useState<TagType[]>([]);
  const onSubmit = (tagInput: TagType) => {
    setTagList([...tagList, tagInput]);
  };
  const onDelete = (deletedTag: string) => {
    setTagList(tagList.filter((tag) => tag.name !== deletedTag));
  };
  const getItem = ({ id, name }: TagType) => {
    return (
      <Tag key={id} type="Default" name={name} onClick={() => onDelete(name)} />
    );
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
    <>
      <TagSearch tagList={allTagList} onSubmit={onSubmit} />
      <Styled.TagContainer>{tagList.map(getItem)}</Styled.TagContainer>
    </>
  );
};

export default TagInput;
