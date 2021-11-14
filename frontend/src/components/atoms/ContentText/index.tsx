import React, { FunctionComponent } from "react";

import * as Styled from "./styled";

interface Props {
  type: string;
  text: string;
}
interface StyleProps {
  color: string;
}
const types: { [key: string]: StyleProps } = {
  Default: {
    color: "black",
  },
};

const contentText: FunctionComponent<Props> = ({ type, text }) => {
  const styleProps = types[type];
  return <Styled.Text {...styleProps}>{text}</Styled.Text>;
};

export default contentText;
