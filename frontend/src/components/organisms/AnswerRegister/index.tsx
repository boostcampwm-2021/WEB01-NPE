import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, FunctionComponent, useRef } from "react";
import { useSession } from "next-auth/client";

import { MDEditor, Button } from "@components/atoms";
import { POST_ANSWER } from "@src/lib";
import * as Styled from "./styled";

interface Props {
  questionId: number;
}

const AnswerRegister: FunctionComponent<Props> = ({ questionId }) => {
  const editorRef = useRef<any>(null);
  const [session] = useSession();
  const router = useRouter();

  const [postAnswer, { data, loading, error }] = useMutation(POST_ANSWER);

  return (
    <Styled.AnswerRegister
      onSubmit={(e) => {
        if (!session || !session.accessToken) return false;
        e.preventDefault();
        postAnswer({
          // 마크다운에디터에서 받아온 desc를 넣어주는 작업이 필요합니다
          variables: {
            questionId,
            desc: "TEST test test test",
            accessToken: session.accessToken,
          },
        });
        router.reload();
      }}
    >
      <h2>당신의 답변</h2>
      <MDEditor type="Answer" editorRef={editorRef} />
      <Styled.AnswerBtnContainer>
        <Button type="Submit" text="답변하기" onClick={() => {}} />
      </Styled.AnswerBtnContainer>
    </Styled.AnswerRegister>
  );
};

export default AnswerRegister;
