import React, { FunctionComponent, Dispatch, SetStateAction } from "react";
import Image from "next/dist/client/image";

import * as Styled from "./style";
import image from "./t.png";

interface Props {
  myMute: boolean;
  setMyMute: Dispatch<SetStateAction<boolean>>;
}
const MuteButton: FunctionComponent<Props> = ({ myMute, setMyMute }) => {
  return (
    <Styled.MuteButton
      onClick={() => {
        setMyMute(!myMute);
      }}
    >
      {image && <Image src={image} alt="아이콘" width={24} height={24} />}
    </Styled.MuteButton>
  );
};

export default MuteButton;
