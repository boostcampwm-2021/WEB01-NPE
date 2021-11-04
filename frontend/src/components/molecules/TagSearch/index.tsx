import React, { FunctionComponent, useRef, useState } from "react";
import * as Styled from "./styled";

interface Props {
  onSubmit: (value: string) => void;
  tagList: string[];
}

const TagSearch: FunctionComponent<Props> = ({ onSubmit, tagList }) => {
  const [candidateTags, setTags] = useState<string[]>([]);
  const inputTag = useRef<HTMLInputElement>(null);
  const onTagClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagName = event.target.dataset.tag;
    inputTag.current.value = tagName;
    setTags([]);
  };
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0) {
      return setTags([]);
    }
    const tags: string[] = tagList.filter((tag: string) =>
      tag.startsWith(value)
    );
    setTags(tags);
  };
  const getItem = (tag: string, index: number) => {
    return (
      <Styled.Tag key={index} data-tag={tag} onClick={onTagClick}>
        {tag}
      </Styled.Tag>
    );
  };
  return (
    <Styled.Container>
      <Styled.Input
        type="text"
        placeholder="tag를 입력하세요"
        onInput={onInput}
        ref={inputTag}
      />
      <Styled.Button onClick={() => onSubmit(inputTag.current.value)}>추가</Styled.Button>
      {candidateTags.length !== 0 && (
        <Styled.TagList>{candidateTags.map(getItem)}</Styled.TagList>
      )}
    </Styled.Container>
  );
};

export default TagSearch;
