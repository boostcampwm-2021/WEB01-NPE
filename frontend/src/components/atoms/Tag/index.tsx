import React, { FunctionComponent, MouseEventHandler } from "react";

import * as Styled from "./styled";

interface Props {
  type: string;
  name: string;
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

const Tag: FunctionComponent<Props> = ({ type, name, onClick }) => {
  const styleProps = types[type];
  return (
    <Styled.Tag {...styleProps} className="tag" onClick={onClick}>
      {name}
    </Styled.Tag>
  );
};

export default Tag;
