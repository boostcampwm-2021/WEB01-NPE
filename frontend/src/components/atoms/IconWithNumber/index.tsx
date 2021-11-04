import React, { FunctionComponent } from "react";
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
      {message === "views" && <img src={views} width="30px" />}
      {message === "comments" && <img src={comments} width="30px" />}
      {value}
    </StyledIconWithNumber>
  );
};

export default IconWithNumber;
