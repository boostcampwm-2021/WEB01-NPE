import React, { FunctionComponent, useState } from "react";
import Router from "next/router";

import { Button, ContentText, TitleText } from "@components/atoms";
import { DetailBody } from "@components/organisms";
import { QuestionTitle } from "@components/molecules";
import { QuestionDetailType } from "@src/types";

import * as Styled from "./styled";
import { useSession } from "next-auth/client";
import { deleteQuestionById } from "@src/lib";
import { DELETE_MESSAGE } from "@src/lib/message";

interface Props {
  question: QuestionDetailType;
  realtimeModalHandler: VoidFunction;
}

const QuestionDetail: FunctionComponent<Props> = ({
  question,
  realtimeModalHandler,
}) => {
  const {
    id,
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
  const user = useSession();

  const onDeleteQuestion = async () => {
    if (window.confirm(DELETE_MESSAGE)) {
      try {
        const { data: isDeleted } = await deleteQuestionById(
          Number(question.id)
        );
        if (isDeleted) {
          Router.push("/");
        }
      } catch (err) {
        setDeleteError(true);
      }
    }
  };

  const onEditQuestion = async () => {
    Router.push(`/question/edit/${id}`);
  };

  return (
    <Styled.QuestionDetailContainer>
      <Styled.QuestionHeader>
        <QuestionTitle
          text={title}
          type={realtimeShare ? "online" : "offline"}
          createdAt={createdAt}
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
          <ContentText type="Default" text={`View ${viewCount}`}></ContentText>
          {user[0]?.userId === Number(author.id) && (
            <>
              <span onClick={onDeleteQuestion}>삭제 </span>

              <span onClick={onEditQuestion}> 수정</span>
            </>
          )}
        </Styled.QuestionHeaderInfo>
      </Styled.QuestionHeader>
      <DetailBody
        detail={{ id: Number(id), desc, tags, thumbupCount, author }}
        type="Question"
      />

      {deleteError && (
        <Styled.ModalWrapper>
          <Styled.Modal>삭제할수 없습니다</Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.QuestionDetailContainer>
  );
};

export default QuestionDetail;
