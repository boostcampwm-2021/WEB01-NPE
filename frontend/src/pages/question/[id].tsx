import React, { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import styled from "styled-components";

import { Modal } from "@components/molecules";
import { QuestionDetail, AnswerDetail, Header } from "@components/organisms";
import { AnswerRegister } from "@components/organisms";
import { RealTimeModal, SEOHeader } from "@components/templates";
import { QuestionDetailType, AnswerDetailType } from "@src/types";
import { viewOneQuestionByID } from "@src/lib";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 880px;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  question: QuestionDetailType;
  error?: number;
}

const QuestionPage: NextPage<Props> = ({ question }) => {
  const router = useRouter();
  const [answerInput, setAnswerInput] = useState<string | undefined>();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerDetailType[]>(question.answers);
  const [show, setShow] = useState<boolean>(false);
  const [session] = useSession();
  const [codeList, setCodeList] = useState<string[]>([]);
  const questionId = router.query.id;

  const exitModal = () => {
    setIsModal(false);
  };

  const modalHandler = () => {
    if (session) {
      setIsModal(true);
    } else {
      setShow(true);
    }
  };

  const disconnectAndPostAnswer = () => {
    exitModal();
    setAnswerInput(codeList.join("\n"));
  };

  const onNewAnswer = (newAnswer: AnswerDetailType) => {
    setAnswers((prev) => [...prev, newAnswer]);
  };

  return (
    <>
      <SEOHeader
        title={question.title}
        description={question.desc}
        imageUrl="https://user-images.githubusercontent.com/50866506/142799853-901b29c1-5836-467e-bf89-f8f37a08a17f.png"
        siteUrl={`https://nullpointerexception.ml/question/${questionId}`}
      />
      <Header type="Default" setTexts={() => {}} />
      <MainContainer>
        <QuestionDetail
          question={question}
          realtimeModalHandler={modalHandler}
        />

        <h2>{answers.length}개의 답변</h2>

        {answers.map((answer) => {
          return (
            <li key={answer.id}>
              <AnswerDetail answer={answer} />
            </li>
          );
        })}
        <AnswerRegister
          questionId={Number(questionId)}
          onNewAnswer={onNewAnswer}
          value={answerInput}
        />
        {isModal && (
          <RealTimeModal
            question={question}
            exitModal={exitModal}
            disconnectAndPostAnswer={disconnectAndPostAnswer}
            setCodeList={setCodeList}
          />
        )}
      </MainContainer>
      {show && (
        <Modal
          show={show}
          onClose={() => {
            setShow(false);
          }}
        >
          로그인해주세요
        </Modal>
      )}
    </>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: Params = context.params as Params;
  try {
    const viewedQuestion = await viewOneQuestionByID(Number(id));
    const question = viewedQuestion.data.viewOneQuestionById;

    return {
      props: {
        question,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default QuestionPage;
