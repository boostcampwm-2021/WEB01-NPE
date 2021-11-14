import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { Tag } from "@components/atoms";
import { TagType } from "@src/types";
interface Props {
  tags: TagType[];
}

const TagList: FunctionComponent<Props> = ({ tags }) => {
  return (
    <Styled.TagList>
      {tags.map((tag) => {
        return (
          <Styled.Tag key={tag.id}>
            <Tag type={"Default"} name={tag.name} onClick={() => {}} />
          </Styled.Tag>
        );
      })}
    </Styled.TagList>
  );
};

export default TagList;
