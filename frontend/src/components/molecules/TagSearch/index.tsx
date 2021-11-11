import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { getAllTags } from "../../../lib";
import * as Styled from "./styled";

interface Props {
  onSubmit: (value: string) => void;
}

const TagSearch: FunctionComponent<Props> = ({ onSubmit }) => {
  const [candidateTags, setTags] = useState<string[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await getAllTags();
      if (data) {
        const tagList = data.getAllTags.map((e) => e.name);
        setTagList(tagList);
      }
    };
    fetchTags();
  }, []);

  return (
    <Styled.Container>
      <Styled.Input
        type="text"
        placeholder="tag를 입력하세요"
        onInput={onInput}
        ref={inputTag}
      />
      <Styled.Button
        type="button"
        onClick={() => {
          onSubmit(inputTag.current.value);
          inputTag.current.value = "";
        }}
      >
        추가
      </Styled.Button>
      {candidateTags.length !== 0 && (
        <Styled.TagList>{candidateTags.map(getItem)}</Styled.TagList>
      )}
    </Styled.Container>
  );
};

export default TagSearch;
