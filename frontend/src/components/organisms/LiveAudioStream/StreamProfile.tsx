import React, { FunctionComponent } from "react";
import Router from "next/router";

import * as Styled from "./styled";
import { Image, Text } from "@components/atoms";

interface Props {
  name: string;
  profileUrl: string;
}

const StreamProfile: FunctionComponent<Props> = ({ name, profileUrl }) => {
  return (
    <li>
      <Styled.ImageDiv>
        <Image type="Large" src={profileUrl} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text type="LiveStream" text={name} />
      </Styled.TextDiv>
    </li>
  );
};

export default StreamProfile;
