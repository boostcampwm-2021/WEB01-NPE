import React, { FunctionComponent, useState } from "react";
import { TagSearch } from "..";
import { Tag } from "../../atoms";
import * as Styled from "./styled";
interface Props {
  tagList: string[];
  setTagList: (param: string[]) => void;
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
  const onSubmit = (tagInput: string) => {
    setTagList([...tagList, tagInput]);
  };
  const onDelete = (deletedTag: string) => {
    setTagList(tagList.filter((tag) => tag !== deletedTag));
  };
  const getItem = (tag: string, index: number) => {
    return (
      <Tag
        key={index}
        type="Default"
        label={tag}
        onClick={() => onDelete(tag)}
      />
    );
  };
  return (
    <>
      <TagSearch tagList={candidates} onSubmit={onSubmit} />
      <Styled.TagContainer>{tagList.map(getItem)}</Styled.TagContainer>
    </>
  );
};

export default TagInput;
