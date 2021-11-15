import React, { FunctionComponent } from "react";

import { TitleText } from "@src/components/atoms";
import ProfileAnswer from "@src/components/molecules/ProfileAnswer";
import { AnswerType } from "@src/types";
import * as Styled from "./styled";

interface Props {
  postAnswers: AnswerType[];
}

const ProfileAnswerSummary: FunctionComponent<Props> = ({ postAnswers }) => {
  return (
    <Styled.ProfileAnswerSummary>
      <TitleText type={"Default"} text={`작성한 답변(${postAnswers.length})`} />
      {postAnswers.map((postAnswer) => (
        <ProfileAnswer
          postAnswer={postAnswer}
          key={postAnswer.id}
        ></ProfileAnswer>
      ))}
    </Styled.ProfileAnswerSummary>
  );
};

export default ProfileAnswerSummary;
