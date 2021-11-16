import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { Image, Text } from "@components/atoms";
import { AuthorType } from "@src/types";

interface Props {
  author: AuthorType;
}

const ProfileSummary: FunctionComponent<Props> = ({ author }) => {
  return (
    <Styled.Anchor href={`profile/${author.id}`}>
      <Styled.ImageDiv>
        <Image type="Large" src={author.profileUrl} />
      </Styled.ImageDiv>
      <Styled.TextDiv>
        <Text type="Header" text={author.username} />
        <Text type="Default" text={`${author.score}`} />
      </Styled.TextDiv>
    </Styled.Anchor>
  );
};

export default ProfileSummary;
