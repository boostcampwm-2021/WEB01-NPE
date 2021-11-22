import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, FunctionComponent, useRef } from "react";
import { useSession } from "next-auth/client";

import { MDEditor, Button } from "@components/atoms";
import { POST_ANSWER } from "@src/lib";
import * as Styled from "./styled";
import { AnswerDetailType } from "@src/types";

interface Props {
  questionId: number;
  onNewAnswer: (newAnswer: AnswerDetailType) => void;
}

const AnswerRegister: FunctionComponent<Props> = ({
  questionId,
  onNewAnswer,
}) => {
  const editorRef = useRef<any>(null);
  const [session] = useSession();
  const router = useRouter();

  const [postAnswer, { data, loading, error }] = useMutation(POST_ANSWER);
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };

  return (
    <Styled.AnswerRegister
      onSubmit={async (e) => {
        if (!session || !session.user) return false;
        e.preventDefault();
        const newAnswer = (
          await postAnswer({
            variables: {
              questionId,
              desc: getMarkdown(),
            },
          })
        ).data.addNewAnswer as AnswerDetailType;

        onNewAnswer(newAnswer);
      }}
    >
      <h2>당신의 답변</h2>
      <MDEditor type="Answer" ref={editorRef} />
      <Styled.AnswerBtnContainer>
        <Button type="Submit" text="답변하기" onClick={() => {}} />
      </Styled.AnswerBtnContainer>
    </Styled.AnswerRegister>
  );
};

export default AnswerRegister;
