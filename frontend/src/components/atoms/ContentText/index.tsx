import React, { FunctionComponent } from "react";
import { StyledText } from "./styled";

interface textProps {
  text: string;
  color?: string;
}

const contentText: FunctionComponent<textProps> = ({ text, color }) => {
  return <StyledText color={color}>{text}</StyledText>;
};

export default contentText;
