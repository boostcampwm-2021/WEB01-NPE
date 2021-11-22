import React, { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";

import { QuestionDetail, AnswerDetail, Header } from "@components/organisms";
import { AnswerRegister } from "@components/organisms";
import { RealTimeModal } from "@components/templates";
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
}

const QuestionPage: NextPage<Props> = ({ question }) => {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerDetailType[]>(question.answers);
  const questionId = router.query.id;

  const exitModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // 브라우저 스크롤 block
  });

  const onNewAnswer = (newAnswer: AnswerDetailType) => {
    setAnswers((prev) => [...prev, newAnswer]);
  };

  return (
    <>
      <Header type="Default" setTexts={() => {}} />
      <MainContainer>
        <QuestionDetail
          question={question}
          realtimeModalHandler={() => {
            setIsModal(true);
          }}
        />

        <h2>{answers.length} 답변들</h2>

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
        />
        {isModal && <RealTimeModal question={question} exitModal={exitModal} />}
      </MainContainer>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: Params = context.params as Params;
  const viewedQuestion = await viewOneQuestionByID(Number(id));
  const question = viewedQuestion.data.viewOneQuestionById;

  if (!question) {
    console.log("reload");
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      question,
    },
  };
};

export default QuestionPage;
