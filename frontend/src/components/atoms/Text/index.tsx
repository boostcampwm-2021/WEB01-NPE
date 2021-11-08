import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  type: string;
  text: string;
}
interface StyleProps {
  color: string;
  fontSize: string;
  fontWeight: string;
  ellipsis: boolean;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    color: "black",
    fontSize: "16px",
    fontWeight: "normal",
    ellipsis: true,
  },
  Header: {
    color: "black",
    fontSize: "12px",
    fontWeight: "bold",
    ellipsis: true,
  },
};

const Text: FunctionComponent<Props> = ({ type, text }) => {
  const styleProps = types[type];
  return <StyledText {...styleProps}>{text}</StyledText>;
};

export default Text;
