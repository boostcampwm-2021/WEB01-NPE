import React, { FunctionComponent } from "react";
import Image from "next/image";

import * as Styled from "./styled";
import viewImg from "./views.png";
import commentImg from "./comments.png";

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
    width: 50,
  },
  Comments: {
    src: commentImg,
    width: 50,
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
