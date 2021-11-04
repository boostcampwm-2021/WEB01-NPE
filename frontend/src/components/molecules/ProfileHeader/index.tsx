import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";

interface Props {
  src: string;
  text: string;
  onClick: () => void;
}

const ProfileHeader: FunctionComponent<Props> = ({ src, text, onClick }) => {
  return (
    <Styled.ProfileDiv onClick={onClick}>
      <Styled.ImageDiv>
        <Image src={src} width={24} height={24} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text text={text} ellipsis={true} fontSize={12} fontWeight={"bold"} />
      </Styled.TextDiv>
    </Styled.ProfileDiv>
  );
};

export default ProfileHeader;
