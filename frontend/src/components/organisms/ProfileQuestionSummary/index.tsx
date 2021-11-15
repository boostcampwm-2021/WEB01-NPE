import React, { FunctionComponent } from "react";

import { TitleText } from "@src/components/atoms";
import { QuestionType } from "@src/types";
import { QuestionList } from "@src/components/templates";
import * as Styled from "./styled";

interface Props {
  postQuestions: QuestionType[];
}

const ProfileQuestionSummary: FunctionComponent<Props> = ({
  postQuestions,
}) => {
  return (
    <Styled.ProfileQuestionSummary>
      <TitleText
        type={"Default"}
        text={`작성한 질문(${postQuestions.length})`}
      />
      <QuestionList questions={postQuestions} showProfile={false} />
    </Styled.ProfileQuestionSummary>
  );
};

export default ProfileQuestionSummary;
