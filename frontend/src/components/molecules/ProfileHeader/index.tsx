import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { Image, Text } from "@components/atoms";
interface Props {
  src: string;
  text: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ProfileHeader: FunctionComponent<Props> = ({ src, text, onClick }) => {
  return (
    <Styled.ProfileDiv onClick={onClick}>
      <Styled.ImageDiv>
        <Image type="Default" src={src} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text type="Header" text={text} />
      </Styled.TextDiv>
    </Styled.ProfileDiv>
  );
};

export default ProfileHeader;
