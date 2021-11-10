import React, { FunctionComponent, MouseEventHandler } from "react";
import { StyledTag } from "./styled";

interface Props {
  type: string;
  label: string;
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

const Tag: FunctionComponent<Props> = ({ type, label, onClick }) => {
  const styleProps = types[type];
  return (
    <StyledTag {...styleProps} className="tag" onClick={onClick}>
      {label}
    </StyledTag>
  );
};

export default Tag;
