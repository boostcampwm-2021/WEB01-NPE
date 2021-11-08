import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";

interface Props {
  src: string;
  name: string;
  rank: string;
}

const ProfileSummary: FunctionComponent<Props> = ({ src, name, rank }) => {
  return (
    <Styled.Anchor>
      <Styled.ImageDiv>
        <Image type="Large" src={src} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text type="Header" text={name} />
        <Text message="Default" text={rank} />
      </Styled.TextDiv>
    </Styled.Anchor>
  );
};

export default ProfileSummary;
