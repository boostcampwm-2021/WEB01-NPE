import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { QuestionDetailType } from "@src/types";
import { DetailBody } from "@components/organisms";
import { QuestionTitle } from "@src/components/molecules";

interface Props {
  question: QuestionDetailType;
}

const QuestionDetail: FunctionComponent<Props> = ({ question }) => {
  const {
    title,
    realtimeShare,
    author,
    desc,
    tags,
    viewCount,
    createdAt,
    thumbupCount,
  } = question;

  return (
    <Styled.QuestionDetailContainer>
      <Styled.QuestionHeader>
        <QuestionTitle
          text={title}
          type={realtimeShare ? "online" : "offline"}
        />
        <Styled.QuestionHeaderInfo>
          Asked {createdAt} View {viewCount}
        </Styled.QuestionHeaderInfo>
      </Styled.QuestionHeader>
      <DetailBody detail={{ desc, tags, thumbupCount, author }} />
    </Styled.QuestionDetailContainer>
  );
};

export default QuestionDetail;
