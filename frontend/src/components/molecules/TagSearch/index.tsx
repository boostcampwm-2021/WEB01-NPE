import React, { createRef, FunctionComponent, useState } from "react";

import * as Styled from "./styled";
import { TagType } from "@src/types";

interface Props {
  onSubmit: (value: TagType) => void;
  tagList: TagType[];
}

const TagSearch: FunctionComponent<Props> = ({ onSubmit, tagList }) => {
  const [candidateTags, setTags] = useState<TagType[]>([]);
  const inputTag = createRef<HTMLInputElement>();
  const onTagClick = (tagname: string) => {
    inputTag!.current!.value = tagname;
    setTags([]);
  };
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 0) {
      return setTags([]);
    }
    const tags = tagList.filter((tag) => tag.name.startsWith(value));
    setTags(tags);
  };
  const getItem = ({ id, name }: TagType) => {
    return (
      <Styled.Tag key={id} data-tag={name} onClick={() => onTagClick(name)}>
        {name}
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
      <Styled.Button
        type="button"
        onClick={() => {
          const __typename = "tag";
          const name = inputTag.current?.value!;
          const id = tagList.find((tag) => tag.name === name)?.id;
          if (!id) return;
          onSubmit({ __typename, id, name });
          inputTag!.current!.value = "";
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
