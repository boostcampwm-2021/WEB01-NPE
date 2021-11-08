import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import * as Atoms from "../../atoms";

interface Props {
  src: string;
  rank: string;
  name: string;
}

const ProfileWithInfo: FunctionComponent<Props> = ({ src, rank, name }) => {
  return (
    <Styled.ProfileWithInfo>
      <Atoms.Profile src={src} size={"small"} />
      <Styled.Info>
        <div className="rank">{rank}</div>
        <div>{name}</div>
      </Styled.Info>
    </Styled.ProfileWithInfo>
  );
};

export default ProfileWithInfo;
