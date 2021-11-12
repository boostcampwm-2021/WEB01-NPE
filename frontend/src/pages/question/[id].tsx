import React from "react";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";

import styled from "styled-components";
import { QuestionDetail, AnswerDetail, Header } from "@components/organisms";
import { QuestionDetailType, AnswerDetailType } from "@src/types";
import { getOneQuestionByID } from "@src/lib";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  data: {
    findOneQuestionById: QuestionDetailType;
  };
}

const QuestionPage: NextPage<Props> = ({ data }) => {
  const { findOneQuestionById: question } = data;
  const { answers }: { answers: AnswerDetailType[] } = question;
  return (
    <>
      <Header type="Default" />
      <MainContainer>
        <QuestionDetail question={question} />
        {answers.map((answer) => {
          return <AnswerDetail answer={answer} key={answer.id} />;
        })}
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: { id: string } = context.params;
  const { data }: { data: QuestionDetailType } = await getOneQuestionByID(
    Number(id)
  );

  if (!data) {
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
