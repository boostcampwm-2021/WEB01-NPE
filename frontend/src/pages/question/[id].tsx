import React from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import styled from "styled-components";

import { QuestionDetailType, AnswerDetailType } from "@src/types";
import { getOneQuestionByID } from "@src/lib";
import { QuestionDetail, AnswerDetail, Header } from "@components/organisms";

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
      <Header type="Default" setTexts={() => {}} />
      <MainContainer>
        <QuestionDetail question={question} />
        {answers.map((answer) => {
          return <AnswerDetail answer={answer} key={answer.id} />;
        })}
      </MainContainer>
    </>
  );
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id }: Params = context.params as Params;
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
