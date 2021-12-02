import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/client";

import { MDEditor, Button } from "@components/atoms";
import { Modal } from "@components/molecules";
import { postAnswer } from "@src/lib";
import * as Styled from "./styled";
import { AnswerDetailType } from "@src/types";

interface Props {
  questionId: number;
  value?: string;
  onNewAnswer: (newAnswer: AnswerDetailType) => void;
}

const AnswerRegister: FunctionComponent<Props> = ({
  questionId,
  value,
  onNewAnswer,
}) => {
  const [isDescModal, setIsDescModal] = useState<boolean>(false);
  const [isLoginMessageModal, setIsLoginMessageModal] = useState<boolean>(
    false
  );
  const editorRef = useRef<any>(null);
  const [session] = useSession();
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!session || !session.user) return setIsLoginMessageModal(true);
    if (getMarkdown().length < 10) return setIsDescModal(true);

    try {
      const { data } = await postAnswer({
        questionId: Number(questionId),
        desc: getMarkdown(),
      });
      onNewAnswer(data.addNewAnswer);
    } catch (err) {
      // console.error(err);
      // 에러처리
    }
  };

  useEffect(() => {
    if (!editorRef || !editorRef.current) return;
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(value);
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <Styled.AnswerRegister onSubmit={onSubmit}>
      <h2>당신의 답변</h2>
      <MDEditor type="Answer" ref={editorRef} />
      <Styled.AnswerBtnContainer>
        <Button type="Submit" text="답변하기" onClick={() => {}} />
      </Styled.AnswerBtnContainer>
      {isLoginMessageModal && (
        <Modal
          show={isLoginMessageModal}
          onClose={() => {
            setIsLoginMessageModal(false);
          }}
        >
          답변을 위해선 로그인이 필요합니다.
        </Modal>
      )}
      {isDescModal && (
        <Modal
          show={isDescModal}
          onClose={() => {
            setIsDescModal(false);
          }}
        >
          내용은 10자 이상 입력해주세요.
        </Modal>
      )}
    </Styled.AnswerRegister>
  );
};

export default AnswerRegister;
