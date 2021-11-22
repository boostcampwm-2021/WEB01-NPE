import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, FunctionComponent, useEffect, useRef } from "react";
import { useSession } from "next-auth/client";

import { MDEditor, Button } from "@components/atoms";
import { POST_ANSWER } from "@src/lib";
import * as Styled from "./styled";

interface Props {
  questionId: number;
  value?: string;
}

const AnswerRegister: FunctionComponent<Props> = ({ questionId, value }) => {
  const editorRef = useRef<any>(null);
  const [session] = useSession();
  const router = useRouter();

  const [postAnswer, { data, loading, error }] = useMutation(POST_ANSWER);
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };

  useEffect(() => {
    if (!editorRef || !editorRef.current) return;

    const editorInstance = editorRef.current.getInstance();
    editorInstance.setHTML(value);
  }, [value]);

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
      {<MDEditor type="Answer" ref={editorRef} />}
      <Styled.AnswerBtnContainer>
        <Button type="Submit" text="답변하기" onClick={() => {}} />
      </Styled.AnswerBtnContainer>
    </Styled.AnswerRegister>
  );
};

export default AnswerRegister;
