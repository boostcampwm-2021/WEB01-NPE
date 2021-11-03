import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  image?: string;
  text: string;
  bgColor: string;
  textColor: string;
  onClick: VoidFunction;
  width?: string;
  height?: string;
}
const Button: FunctionComponent<Props> = ({
  image,
  text,
  bgColor,
  textColor,
  width,
  height,
  onClick,
}) => {
  return (
    <Styled.StyledButton
      bgColor={bgColor}
      textColor={textColor}
      width={width || "136px"}
      height={height || "36px"}
      onClick={onClick}
    >
      {image && <Styled.Icon src={image} alt="아이콘" />}
      <Styled.Text textColor={textColor}>{text}</Styled.Text>
    </Styled.StyledButton>
  );
};

export default Button;
