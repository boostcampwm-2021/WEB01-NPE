import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  text: string;
  tagBgColor?: string;
  textColor?: string;
  deleteBgColor?: string;
  onDelete: VoidFunction;
}

const SideTag: FunctionComponent<Props> = ({
  text,
  tagBgColor,
  textColor,
  deleteBgColor,
  onDelete,
}) => {
  return (
    <Styled.TagContainer
      bgColor={tagBgColor || "#94D3CC"}
      textColor={textColor || "white"}
    >
      <Styled.TagText>{text}</Styled.TagText>
      <Styled.DeleteButton
        bgColor={deleteBgColor || "#fc7047"}
        onClick={onDelete}
      >
        🗑
      </Styled.DeleteButton>
    </Styled.TagContainer>
  );
};

export default SideTag;
