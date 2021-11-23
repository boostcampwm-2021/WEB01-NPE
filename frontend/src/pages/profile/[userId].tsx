import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import styled from "styled-components";

import { HeaderText, TitleText, ContentText, Chart } from "@components/atoms";
import { Header } from "@components/organisms/";
import { getUserProfileData } from "@src/lib";
import { AnswerType, AuthorType, QuestionType } from "@src/types";
import ProfileAnswerSummary from "@src/components/organisms/ProfileAnswerSummary";
import ProfileQuestionSummary from "@src/components/organisms/ProfileQuestionSummary";
import { ChartData } from "chart.js";

interface Props {
  userProfileData: {
    id: number;
    username: string;
    score: number;
    profileUrl: string;
    author: AuthorType;
    postQuestions: QuestionType[];
    postAnswers: AnswerType[];
  };
  userTagCountChartData: ChartData<"doughnut"> & ChartData<"bar">;
  answerStateChartData: ChartData<"doughnut"> & ChartData<"bar">;
}

const ProfilePage: NextPage<Props> = ({
  userProfileData,
  userTagCountChartData,
  answerStateChartData,
}) => {
  return (
    <>
      <Header type="Profile" setTexts={() => ""} />
      <MainContainer>
        <HeaderText type={"Default"} text={"프로필"} />
        <TitleText type={"Default"} text={"기본 정보"} />
        <ProfileDiv>
          <ImageDiv>
            <Image width={192} height={192} src={userProfileData.profileUrl} />
          </ImageDiv>
          <TextDiv>
            <TitleText type={"Default"} text={userProfileData.username} />
            <TitleText
              type={"Default"}
              text={`누적 스코어 : ${String(userProfileData.score)}`}
            />
            <ContentText type={"Default"} text={"abcabc@gmail.com"} />
          </TextDiv>
        </ProfileDiv>
        <ChartWrapper>
          <ChartDiv>
            <TitleText type={"Default"} text={"태그 사용 빈도"} />
            {userTagCountChartData.labels?.length !== 0 ? (
              <Chart type={"Doughnut"} data={userTagCountChartData} />
            ) : (
              <NoChartData>
                <TitleText
                  type="Default"
                  text="아직 데이터가 없습니다"
                ></TitleText>
              </NoChartData>
            )}
          </ChartDiv>
          <ChartDiv>
            <TitleText type={"Default"} text={"활동"} />
            <NoChartData>
              <TitleText type="Default" text="준비중입니다"></TitleText>
            </NoChartData>
            {/* <Chart type={"Bar"} data={dummyChartData} /> */}
          </ChartDiv>
          <ChartDiv>
            <TitleText type={"Default"} text={"채택 비율"} />
            {userProfileData.postAnswers.length !== 0 ? (
              <Chart type={"Doughnut"} data={answerStateChartData} />
            ) : (
              <NoChartData>
                <TitleText
                  type="Default"
                  text="아직 데이터가 없습니다"
                ></TitleText>
              </NoChartData>
            )}
          </ChartDiv>
        </ChartWrapper>
        <SummaryWrapper>
          <ProfileQuestionSummary
            postQuestions={userProfileData.postQuestions}
          ></ProfileQuestionSummary>
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
      userTagCountChartData: makeTagCountChartData(data.getUserUsedTagCount),
      answerStateChartData: makeAnswerStateChartData(
        data.findUserById.postAnswers
      ),
    },
  };
};

const makeTagCountChartData = (
  list: [
    {
      userId: number;
      tagId: number;
      tag: { id: number; name: string };
      count: number;
    }
  ]
): ChartData<"doughnut"> & ChartData<"bar"> => {
  return {
    labels: list.map((obj) => obj.tag.name),
    datasets: [
      {
        data: list.map((obj) => obj.count),
        backgroundColor: list.map((_) => {
          const [c1, c2, c3] = [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
          ];

          return `rgba(${c1},${c2},${c3},0.2)`;
        }),
        borderWidth: 1,
      },
    ],
  };
};

const makeAnswerStateChartData = (
  postAnswers: {
    state: 0 | 1;
  }[]
): ChartData<"doughnut"> & ChartData<"bar"> => {
  const totalAnswerCount = postAnswers.length;
  const adoptedAnswerCount = postAnswers.filter(
    (postAnswer) => postAnswer.state === 1
  ).length;
  const notAdobptedAnswerCount = totalAnswerCount - adoptedAnswerCount;

  return {
    labels: ["채택됨", "채택되지 않음"],
    datasets: [
      {
        data: [adoptedAnswerCount, notAdobptedAnswerCount],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderWidth: 1,
      },
    ],
  };
};

const NoChartData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
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

export default ProfilePage;
