import React, { FunctionComponent } from "react";
import Image from "next/image";
import LogoImg from "./logo.png";
import ShortLogoImg from "./shortLogo.png";
interface Props {
  type: string;
}

interface StyleProps {
  src: StaticImageData;
  width: number;
  height: number;
  alt: string;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    src: LogoImg,
    width: 321,
    height: 48,
    alt: "Home화면으로 이동",
  },
  Short: {
    src: ShortLogoImg,
    width: 48,
    height: 48,
    alt: "Home화면으로 이동",
  },
};

const Logo: FunctionComponent<Props> = ({ type }) => {
  const styleProps = types[type];
  return <Image {...styleProps}></Image>;
};

export default Logo;
