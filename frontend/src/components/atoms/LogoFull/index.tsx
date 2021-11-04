import React, { FunctionComponent } from "react";
import Image from "next/image";
import LogoImage from "./logo.png";

interface Props {}

const Logo: FunctionComponent<Props> = ({}) => {
  return <Image src={LogoImage} width={321} height={48} alt=".."></Image>;
};

export default Logo;
