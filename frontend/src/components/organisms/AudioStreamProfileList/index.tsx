import React, { FunctionComponent, useState } from "react";

import { AudioStreamProfile } from "@src/components/molecules";
import * as Styled from "./styled";

interface Props {
  profiles: any;
}

const AudioStreamProfileList: FunctionComponent<Props> = ({ profiles }) => {
  return (
    <Styled.ProfileList>
      {Object.values(profiles).map((elm: any, idx) => {
        const user = elm.user;
        return (
          <AudioStreamProfile
            name={user.name}
            profileUrl={user.image}
            key={idx}
          />
        );
      })}
    </Styled.ProfileList>
  );
};

export default AudioStreamProfileList;
