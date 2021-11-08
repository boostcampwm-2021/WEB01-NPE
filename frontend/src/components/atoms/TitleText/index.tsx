import React, { FunctionComponent } from "react";
import { StyledText } from "./styled";

interface Props {
  type: string;
  text: string;
}

interface StyleProps {
  color: string;
}
const types: { [key: string]: StyleProps } = {
  Default: {
    color: "black",
  },
};
const TitleText: FunctionComponent<Props> = ({ type, text }) => {
  const styleProps = types[type];
  return <StyledText {...styleProps}>{text}</StyledText>;
};

export default TitleText;
