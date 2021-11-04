import React, { FunctionComponent } from "react";
import Image from "next/image";
import { StyledIconWithNumber } from "./styled";
import views from "./views.png";
import comments from "./comments.png";

interface Props {
  message: string;
  value?: number;
}

const IconWithNumber: FunctionComponent<Props> = ({ message, value }) => {
  return (
    <StyledIconWithNumber>
      {message === "views" && <Image src={views} width={30} />}
      {message === "comments" && <Image src={comments} width={30} />}
      {value}
    </StyledIconWithNumber>
  );
};

export default IconWithNumber;
