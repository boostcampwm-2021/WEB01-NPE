import React, { FunctionComponent, MouseEventHandler } from "react";
import Link from "next/link";
import { StyledTag } from "./styled";

import * as Type from "../../../types";

interface Props {
  type: string;
  tag: Type.Tag;
  onClick: MouseEventHandler;
}

interface StyleProps {
  fontSize: string;
  bgColor: string;
  color: string;
  hoverTextColor: string;
  hoverBgColor: string;
  border: string;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    fontSize: "14px",
    bgColor: "white",
    color: "#F48024",
    hoverTextColor: "white",
    hoverBgColor: "#F48024",
    border: "1px solid #F48024",
  },
  Gray: {
    fontSize: "14px",
    bgColor: "white",
    color: "#5C5C5C",
    hoverTextColor: "white",
    hoverBgColor: "#BCBBBB",
    border: "1px solid #BCBBBB",
  },
};

const Tag: FunctionComponent<Props> = ({ type, tag, onClick }) => {
  const styleProps = types[type];
  return (
    <Link href={`tag/${tag.name}`}>
      <StyledTag {...styleProps} className="tag" onClick={onClick}>
        {tag.name}
      </StyledTag>
    </Link>
  );
};

export default Tag;
