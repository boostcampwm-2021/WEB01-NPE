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
          console.log(answer.id);
          return (
            <li key={answer.id}>
              <AnswerDetail answer={answer} />
            </li>
          );
        })}
        <AnswerRegister questionId={Number(questionId)} />
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
