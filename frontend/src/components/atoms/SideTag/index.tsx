import React, { FunctionComponent } from "react";

import * as Styled from "./styled";

interface Props {
  type: string;
  text: string;
  onDelete: (value: string) => void;
}

interface StyleProps {
  tagBgColor: string;
  textColor: string;
  deleteBgColor: string;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    tagBgColor: "#94D3CC",
    textColor: "white",
    deleteBgColor: "#fc7047",
  },
};

const SideTag: FunctionComponent<Props> = ({ type, text, onDelete }) => {
  const styleProps = types[type];
  return (
    <Styled.TagContainer {...styleProps}>
      <Styled.TagText>{text}</Styled.TagText>
      <Styled.DeleteButton {...styleProps} onClick={() => onDelete(text)}>
        🗑
      </Styled.DeleteButton>
    </Styled.TagContainer>
  );
};

export default SideTag;
