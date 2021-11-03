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
        <Image src={src} width={48} height={48} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text text={name} ellipsis={true} fontSize={10} fontWeight={"bold"} />
        <Text text={rank} fontSize={10} />
      </Styled.TextDiv>
    </Styled.Anchor>
  );
};

export default ProfileSummary;
