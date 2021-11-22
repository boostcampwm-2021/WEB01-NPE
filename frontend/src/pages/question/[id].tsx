import React, { useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps } from "next";
import Head from "next/head";
import type { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { Modal } from "@components/molecules";
import { QuestionDetail, AnswerDetail, Header } from "@components/organisms";
import { AnswerRegister } from "@components/organisms";
import { RealTimeModal } from "@components/templates";
import { QuestionDetailType, AnswerDetailType } from "@src/types";
import { getOneQuestionByID } from "@src/lib";
import Logo from "./logo.png";

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
  const [show, setShow] = useState<boolean>(false);
  const [session, loading] = useSession();
  const questionId = router.query.id;
  const { findOneQuestionById: question } = data;
  const { answers }: { answers: AnswerDetailType[] } = question;

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

  useEffect(() => {
    document.body.style.overflow = "hidden"; // 브라우저 스크롤 block
  });

  return (
    <>
      <Head>
        <title>{question.title}</title>
        <meta name="description" content={question.desc} />
        <meta
          name="keywords"
          content={question.tags.map((tag) => tag).join(" ")}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={question.title} />
        <meta property="og:description" content={question.desc} />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/50866506/142799853-901b29c1-5836-467e-bf89-f8f37a08a17f.png"
        />
        <meta property="og:site_name" content="NullPointerException" />
        <meta property="og:locale" content="ko_KR" />
        <meta
          property="og:url"
          content={`http://118.67.142.132/question/${questionId}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="118.67.142.132.com" />
        <meta
          name="twitter:title"
          property="og:title"
          content={question.title}
        />
        <meta
          name="twitter:description"
          property="og:description"
          content={question.desc}
        ></meta>
      </Head>
      <Header type="Default" setTexts={() => {}} />
      <MainContainer>
        <QuestionDetail
          question={question}
          realtimeModalHandler={modalHandler}
        />

        <h2>{answers.length} 답변들</h2>

        {answers.map((answer) => {
          return (
            <li key={answer.id}>
              <AnswerDetail answer={answer} />
            </li>
          );
        })}
        <AnswerRegister questionId={Number(questionId)} />
        {isModal && <RealTimeModal question={question} exitModal={exitModal} />}
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
