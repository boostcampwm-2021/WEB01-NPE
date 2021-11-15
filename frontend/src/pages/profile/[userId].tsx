import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useSession } from "next-auth/client";
import styled from "styled-components";

import {
  HeaderText,
  TitleText,
  ContentText,
  Image,
  Chart,
} from "@components/atoms";
import { Header } from "@components/organisms/";
import { QuestionList } from "@components/templates";
import { getUserProfileData } from "@src/lib";
import { AnswerType, QuestionType } from "@src/types";
import ProfileAnswerSummary from "@src/components/organisms/ProfileAnswerSummary";
import ProfileAnswer from "@src/components/molecules/ProfileAnswer";

interface Props {
  userProfileData: {
    username: string;
    score: number;
    postQuestions: QuestionType[];
    postAnswers: AnswerType[];
  };
}

const ProfilePage: NextPage<Props> = ({ userProfileData }) => {
  // const [session, loading] = useSession();

  // if (!session || !session.user) {
  //   return <>error</>;
  // }

  return (
    <>
      <Header type="Profile" setTexts={() => ""} />
      <MainContainer>
        <HeaderText type={"Default"} text={"프로필"} />
        <TitleText type={"Default"} text={"기본 정보"} />
        <ProfileDiv>
          <ImageDiv>
            {/* <Image type={"Profile"} src={session.user.image!} /> */}
          </ImageDiv>
          <TextDiv>
            {/* <TitleText type={"Default"} text={session.user.name!} /> */}
            <TitleText
              type={"Default"}
              text={`누적 스코어 : ${String(userProfileData.score)}`}
            />
            {/* <ContentText type={"Default"} text={session.user.email!} /> */}
          </TextDiv>
        </ProfileDiv>
        <ChartWrapper>
          <ChartDiv>
            <TitleText type={"Default"} text={"태그별"} />
            <Chart type={"Doughnut"} data={chartData} />
          </ChartDiv>
          <ChartDiv>
            <TitleText type={"Default"} text={"활동"} />
            <Chart type={"Bar"} data={chartData} />
          </ChartDiv>
          <ChartDiv>
            <TitleText type={"Default"} text={"채택 비율"} />
            <Chart type={"Doughnut"} data={chartData} />
          </ChartDiv>
        </ChartWrapper>
        <SummaryWrapper>
          <QuestionDiv>
            <TitleText
              type={"Default"}
              text={`작성한 질문(${userProfileData.postQuestions.length})`}
            />
            <QuestionList questions={userProfileData.postQuestions} />
          </QuestionDiv>
          <ProfileAnswerSummary
            postAnswers={userProfileData.postAnswers}
          ></ProfileAnswerSummary>
        </SummaryWrapper>
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = Number(context.query.userId);
  const { data } = await getUserProfileData(userId);

  return {
    props: {
      userProfileData: data.findUserById,
    },
  };
};

const chartData = {
  labels: ["React", "Javascript", "HTML"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  div {
    margin-top: 10px;
    margin-bottom: 20px;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ImageDiv = styled.div`
  display: flex;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  overflow: hidden;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 50px;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const SummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    padding-inline-start: 0px;
  }
`;

export default ProfilePage;
