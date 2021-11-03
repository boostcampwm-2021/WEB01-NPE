import React, { FunctionComponent } from "react";
import { DeleteButton, TagContainer, TagText } from "./styled";

interface Props {
  text: string;
  tagBgColor?: string;
  textColor?: string;
  deleteBgColor?: string;
  deleteHandler: Function;
}

const SideTag: React.VFC<Props> = ({
  text,
  tagBgColor,
  textColor,
  deleteBgColor,
  deleteHandler,
}) => {
  return (
    <TagContainer
      bgColor={tagBgColor || "#94D3CC"}
      textColor={textColor || "white"}
      {...deleteHandler}
    >
      <TagText>{text}</TagText>
      <DeleteButton
        bgColor={deleteBgColor || "#fc7047"}
        onClick={() => {
          deleteHandler();
        }}
      >
        🗑
      </DeleteButton>
    </TagContainer>
  );
};

export default SideTag;
