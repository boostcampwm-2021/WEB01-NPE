import React, { FunctionComponent } from "react";

import { ContentText, TitleText } from "@src/components/atoms";
import { AnswerType } from "@src/types";
import * as Styled from "./styled";

interface Props {
  postAnswer: AnswerType;
}

const ProfileAnswer: FunctionComponent<Props> = ({ postAnswer }) => {
  return (
    <Styled.ProfileAnswer>
      <TitleText type={"Default"} text={postAnswer.desc} />
      <ContentText
        type={"Default"}
        text={`좋아요 ${postAnswer.thumbupCount}개 · ${
          postAnswer.state === 1 ? "채택됨" : "채택되지 않음"
        }`}
      />
    </Styled.ProfileAnswer>
  );
};

export default ProfileAnswer;
