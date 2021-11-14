import React from "react";
import type { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import { useSession } from "next-auth/client";

import Header from "../../components/organisms/Header";
import HeaderText from "../../components/atoms/HeaderText";
import TitleText from "../../components/atoms/TitleText";
import ContentText from "../../components/atoms/ContentText";
import Image from "../../components/atoms/Image";
import Chart from "../../components/atoms/Chart";
import QuestionLists from "../../components/templates/QuestionList";
import { getUserChartData } from "@src/lib";
import { AnswerType, QuestionType } from "@src/types";

interface Props {
  userChartData: {
    username: string;
    score: number;
    postQuestions: QuestionType[];
    postAnswers: Partial<AnswerType>[];
  };
}

const ProfilePage: NextPage<Props> = ({ userChartData }) => {
  const [session, loading] = useSession();

  if (!session || !session.user) {
    return <>error</>;
  }

  return (
    <>
      <Header type="Profile" />
      <MainContainer>
        <HeaderText type={"Default"} text={"프로필"} />
        <TitleText type={"Default"} text={"기본 정보"} />
        <ProfileDiv>
          <ImageDiv>
            <Image type={"Profile"} src={session.user.image!} />
          </ImageDiv>
          <TextDiv>
            <TitleText type={"Default"} text={session.user.name!} />
            <TitleText
              type={"Default"}
              text={`누적 스코어 : ${String(userChartData.score)}`}
            />
            <ContentText type={"Default"} text={session.user.email!} />
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
        <QuestionWrapper>
          <QuestionDiv>
            <TitleText
              type={"Default"}
              text={`작성한 질문(${userChartData.postQuestions.length})`}
            />
            <QuestionLists questions={userChartData.postQuestions} />
          </QuestionDiv>
          <QuestionDiv>
            <TitleText
              type={"Default"}
              text={`작성한 답변(${userChartData.postAnswers.length})`}
            />
            {userChartData.postAnswers.map((postAnswer) => {
              return (
                <div
                  style={{
                    width: "600px",
                    borderTop: "1px solid black",
                    margin: "0px",
                    marginTop: "16px",
                    padding: "0px 10px",
                  }}
                >
                  <TitleText type={"Default"} text={postAnswer.desc} />
                  <ContentText
                    type={"Default"}
                    text={`좋아요 ${postAnswer.thumbupCount}개 · ${
                      postAnswer.state === 1 ? "채택됨" : "채택되지 않음"
                    }`}
                  />
                </div>
              );
            })}
          </QuestionDiv>
        </QuestionWrapper>
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await getUserChartData(
    1 /* 임시로 1번 유저를 넣음. 이후에 nextSession에서 userID를 가져와야함 */
  );

  return {
    props: {
      userChartData: data.findUserById,
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

const QuestionWrapper = styled.div`
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
