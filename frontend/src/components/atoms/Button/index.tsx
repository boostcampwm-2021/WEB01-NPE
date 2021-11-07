import React, { FunctionComponent } from "react";
import Image from "next/image";
import * as Styled from "./styled";

type size_literal = "small" | "medium" | "large";
interface Props {
  image?: string | StaticImageData;
  text: string;
  textColor: string;
  size: size_literal;
  onClick: VoidFunction;
  bgColor: string;
}
const Button: FunctionComponent<Props> = ({
  image,
  text,
  textColor,
  bgColor,
  onClick,
  size,
}) => {
  return (
    <Styled.Button
      textColor={textColor}
      onClick={onClick}
      size={size}
      bgColor={bgColor}
    >
      {image && <Image src={image} alt="아이콘" width={24} height={24} />}
      {text}
    </Styled.Button>
  );
};

export default Button;
