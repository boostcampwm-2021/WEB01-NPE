import React, { FunctionComponent } from "react";
import Image from "next/image";

import * as Styled from "./styled";

interface eventProps {
  type: string;
  image?: string | StaticImageData;
  text: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}
interface voidProps {
  type: string;
  image?: string | StaticImageData;
  text: string;
  onClick: () => void;
}

interface StyleProps {
  bgColor: string;
  textColor: string;
  width: string;
  height: string;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    bgColor: "#fff",
    textColor: "#000",
    width: "136px",
    height: "36px",
  },
  Header: {
    bgColor: "#F48024",
    textColor: "white",
    width: "136px",
    height: "36px",
  },
  Github: {
    bgColor: "#000",
    textColor: "#fff",
    width: "100%",
    height: "36px",
  },
  Submit: {
    bgColor: "#F48024",
    textColor: "white",
    width: "100%",
    height: "36px",
  },
  realtimeShare_active: {
    bgColor: "var(--orange-primary)",
    textColor: "white",
    width: "200px",
    height: "36px",
  },
  realtimeShare_inactive: {
    bgColor: "var(--grey-primary)",
    textColor: "white",
    width: "200px",
    height: "36px",
  },
};
const Button: FunctionComponent<eventProps | voidProps> = ({
  type,
  image,
  text,
  onClick,
}) => {
  const buttonProps: StyleProps = types[type];

  return (
    <Styled.StyledButton {...buttonProps} onClick={onClick}>
      {image && <Image src={image} alt="아이콘" width={24} height={24} />}
      <Styled.Text textColor={buttonProps.textColor}>{text}</Styled.Text>
    </Styled.StyledButton>
  );
};

export default Button;
