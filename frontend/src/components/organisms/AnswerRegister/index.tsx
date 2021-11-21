import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, FunctionComponent, useRef } from "react";
import { useSession } from "next-auth/client";

import { MDEditor, Button } from "@components/atoms";
import { POST_ANSWER } from "@src/lib";
import * as Styled from "./styled";

interface Props {
  questionId: number;
  initialValue?: string;
}

const AnswerRegister: FunctionComponent<Props> = ({
  questionId,
  initialValue,
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
        await postAnswer({
          variables: {
            questionId,
            desc: getMarkdown(),
          },
        });

        router.reload();
      }}
    >
      <h2>당신의 답변</h2>
      {<MDEditor type="Answer" ref={editorRef} initialValue={initialValue} />}
      <Styled.AnswerBtnContainer>
        <Button type="Submit" text="답변하기" onClick={() => {}} />
      </Styled.AnswerBtnContainer>
    </Styled.AnswerRegister>
  );
};

export default AnswerRegister;
