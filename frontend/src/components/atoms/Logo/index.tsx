import React, { FunctionComponent } from "react";
import Image from "next/image";
import logoImage from "./logo.png";
import fullLogoImage from "./fullLogo.png";

interface Props {
  message: string;
}

const Logo: FunctionComponent<Props> = ({ message }) => {
  return (
    <>
      {message === "short" && (
        <Image src={logoImage} width={48} height={48} alt="logo"></Image>
      )}

      {message === "long" && (
        <Image
          src={fullLogoImage}
          width={321}
          height={48}
          alt="full logo"
        ></Image>
      )}
    </>
  );
};

export default Logo;
