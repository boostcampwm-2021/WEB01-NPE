import React, { FunctionComponent } from "react";
import { StyledText } from "./styled";

interface textProps {
  text: string;
  color?: string;
}

const TitleText: FunctionComponent<textProps> = ({ text, color }) => {
  return <StyledText color={color || "black"}>{text}</StyledText>;
};

export default TitleText;
