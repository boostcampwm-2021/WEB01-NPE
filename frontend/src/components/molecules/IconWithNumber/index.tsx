import React, { FunctionComponent } from "react";
import Image from "next/image";

import * as Styled from "./styled";
import viewImg from "./views.svg";
import commentImg from "./answers.svg";

interface Props {
  type: string;
  value: number;
}

interface StyleProps {
  src: string | StaticImageData;
  width: number;
}

const types: { [key: string]: StyleProps } = {
  Views: {
    src: viewImg,
    width: 30,
  },
  Comments: {
    src: commentImg,
    width: 30,
  },
};

const IconWithNumber: FunctionComponent<Props> = ({ type, value }) => {
  const styleProps = types[type];
  return (
    <Styled.IconWithNumber>
      <Image {...styleProps} />
      {value}
    </Styled.IconWithNumber>
  );
};

export default IconWithNumber;
