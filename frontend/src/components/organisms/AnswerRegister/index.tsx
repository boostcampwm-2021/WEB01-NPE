import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FormEvent, FunctionComponent, useRef, useState } from "react";
import { useSession } from "next-auth/client";

import { MDEditor, Button } from "@components/atoms";
import { Modal } from "@components/molecules";
import { POST_ANSWER } from "@src/lib";
import * as Styled from "./styled";

interface Props {
  questionId: number;
}

const AnswerRegister: FunctionComponent<Props> = ({ questionId }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const editorRef = useRef<any>(null);
  const [session] = useSession();
  const router = useRouter();

  const [postAnswer, { data, loading, error }] = useMutation(POST_ANSWER);
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!session || !session.user) {
      return setIsModal(true);
    }
    await postAnswer({
      variables: {
        questionId,
        desc: getMarkdown(),
      },
    });

    router.reload();
  };

  return (
    <Styled.AnswerRegister onSubmit={onSubmit}>
      <h2>당신의 답변</h2>
      <MDEditor type="Answer" ref={editorRef} />
      <Styled.AnswerBtnContainer>
        <Button type="Submit" text="답변하기" onClick={() => {}} />
      </Styled.AnswerBtnContainer>
      {isModal && (
        <Modal
          show={isModal}
          onClose={() => {
            setIsModal(false);
          }}
        >
          답변을 위해선 로그인이 필요합니다.
        </Modal>
      )}
    </Styled.AnswerRegister>
  );
};

export default AnswerRegister;
