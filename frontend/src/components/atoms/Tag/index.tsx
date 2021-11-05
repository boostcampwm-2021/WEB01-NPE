import type { NextPage } from "next";
import React, { FunctionComponent, MouseEventHandler } from "react";
import { StyledTag } from "./styled";

interface Props {
  label: string;
  onClick: MouseEventHandler;
}

const Tag: FunctionComponent<Props> = ({ label, onClick }) => {
  return (
    <StyledTag className="tag" onClick={onClick}>
      {label}
    </StyledTag>
  );
};

export default Tag;
