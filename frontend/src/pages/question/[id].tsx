import React, { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import styled from "styled-components";
import { Router, useRouter } from "next/router";

import { QuestionDetail, AnswerDetail, Header } from "@components/organisms";
import { AnswerRegister } from "@components/organisms";
import { RealTimeModal } from "@components/templates";
import { QuestionDetailType, AnswerDetailType } from "@src/types";
import { getOneQuestionByID } from "@src/lib";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 880px;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  data: {
    findOneQuestionById: QuestionDetailType;
  };
}

const QuestionPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const [anwerInput, setAnswerInput] = useState<string | undefined>();
  const [isModal, setIsModal] = useState<boolean>(false);
  const questionId = router.query.id;
  const { findOneQuestionById: question } = data;
  const { answers }: { answers: AnswerDetailType[] } = question;

  const exitModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // 브라우저 스크롤 block
  });

  // 실시간 모달에서 '답변달고 나가기'를 선택하면 실행되는 핸들러 입니다.
  const disconnectAndPostAnswer = () => {
    exitModal();
    // 해당 함수를 통해 AnswerInput을 갱신해도 실제 MDEditor의 입력값이 바뀌지 않음
    // 아마 MDEditor는 CSR을 사용하기 때문에 갱신되지 않는 것 같음
    router.reload();
    setAnswerInput("abcd");
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
          initialValue={anwerInput}
        />
        {isModal && (
          <RealTimeModal
            question={question}
            exitModal={exitModal}
            disconnectAndPostAnswer={disconnectAndPostAnswer}
          />
        )}
      </MainContainer>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: Params = context.params as Params;
  const {
    data,
  }: {
    data: { findOneQuestionById: QuestionDetailType };
  } = await getOneQuestionByID(Number(id));

  if (!data) {
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
      data,
    },
  };
};

export default QuestionPage;
