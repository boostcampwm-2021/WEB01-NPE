import React, { FunctionComponent, useState } from "react";
import * as Styled from "./styled";
import * as Atom from "../../atoms";

import * as Type from "../../../types";
interface Props {
  tags: Type.Tag[];
}

const TagList: FunctionComponent<Props> = ({ tags }) => {
  return (
    <Styled.TagList>
      {tags.map((tag: Type.Tag, index: number) => {
        return (
          <Styled.Tag key={index}>
            <Atom.Tag type={"Default"} tag={tag} onClick={() => {}} />
          </Styled.Tag>
        );
      })}
    </Styled.TagList>
  );
};

export default TagList;
