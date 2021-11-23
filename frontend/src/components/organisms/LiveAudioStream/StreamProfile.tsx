import React, { FunctionComponent } from "react";
import Router from "next/router";
import Image from "next/image";

import * as Styled from "./styled";
import { Text } from "@components/atoms";

interface Props {
  name: string;
  profileUrl: string;
}

const StreamProfile: FunctionComponent<Props> = ({ name, profileUrl }) => {
  return (
    <li>
      <Styled.ImageDiv>
        <Image width={48} height={48} src={profileUrl} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text type="LiveStream" text={name} />
      </Styled.TextDiv>
    </li>
  );
};

export default StreamProfile;
