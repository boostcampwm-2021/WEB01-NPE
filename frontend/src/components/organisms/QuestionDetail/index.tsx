import React, { FunctionComponent, useState } from "react";
import Router from "next/router";

import { Button, ContentText, TitleText } from "@components/atoms";
import { DetailBody } from "@components/organisms";
import { QuestionTitle } from "@components/molecules";
import { QuestionDetailType } from "@src/types";
import { gql, useMutation } from "@apollo/client";

import * as Styled from "./styled";

const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: Float!) {
    deleteQuestion(questionId: $questionId)
  }
`;
interface Props {
  question: QuestionDetailType;
  realtimeModalHandler: VoidFunction;
}

const QuestionDetail: FunctionComponent<Props> = ({
  question,
  realtimeModalHandler,
}) => {
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

  const [deleteError, setDeleteError] = useState(false);
  const [deleteQuestionById, { data: isDeleted }] = useMutation(
    DELETE_QUESTION,
    {
      onError: () => {
        setDeleteError(true);
        setTimeout(() => {
          setDeleteError(false);
        }, 800);
      },
    }
  );

  const onDeleteQuestion = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteQuestionById({ variables: { questionId: Number(question.id) } });
      if (isDeleted) {
        Router.push("/");
      }
    }
  };

  return (
    <Styled.QuestionDetailContainer>
      <Styled.QuestionHeader>
        <QuestionTitle
          text={title}
          type={realtimeShare ? "online" : "offline"}
        />
        <Styled.RealTimeRequest>
          {realtimeShare ? (
            <Button
              type="realtimeShare_active"
              text="실시간 답변 요청"
              onClick={realtimeModalHandler}
            />
          ) : (
            <Button
              type="realtimeShare_inactive"
              text="실시간 답변 요청"
              onClick={() => {}}
            />
          )}
        </Styled.RealTimeRequest>

        <Styled.QuestionHeaderInfo>
          <ContentText
            type="Default"
            text={`Asked ${createdAt.slice(0, 10)} View ${viewCount}`}
          ></ContentText>
          <span onClick={onDeleteQuestion}>삭제</span>
        </Styled.QuestionHeaderInfo>
      </Styled.QuestionHeader>
      <DetailBody detail={{ desc, tags, thumbupCount, author }} />

      {deleteError && (
        <Styled.ModalWrapper>
          <Styled.Modal>삭제할수 없습니다</Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.QuestionDetailContainer>
  );
};

export default QuestionDetail;
