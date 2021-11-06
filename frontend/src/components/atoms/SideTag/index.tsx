import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  text: string;
  tagBgColor?: string;
  textColor?: string;
  deleteBgColor?: string;
  onDelete: (value: string) => void;
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
      bgColor={tagBgColor || "var(--green-tag)"}
      textColor={textColor || "var(--white-primary)"}
    >
      <Styled.TagText>{text}</Styled.TagText>
      <Styled.DeleteButton
        bgColor={deleteBgColor || "var(--orange-tag)"}
        onClick={() => onDelete(text)}
      >
        🗑
      </Styled.DeleteButton>
    </Styled.TagContainer>
  );
};

export default SideTag;
