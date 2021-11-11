import { Header, SideBar } from "../components/organisms";
import QuestionList from "../components/templates/QuestionList";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Question } from "../types";
import { getQuestions } from "../lib/";
import { useState } from "react";

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

interface Data {
  searchQuestions: Question[];
}
interface Props {
  data: Data;
  error: any;
}

const MainPage: NextPage<Props> = ({ data, error }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [texts, setTexts] = useState<string>("");
  const { searchQuestions } = data;
  return (
    <>
      <Header type="Default" setTexts={setTexts} />
      <MainContainer>
        <SideBar selectedTags={tags} setSelectedTags={setTags} />
        <QuestionList questions={searchQuestions} />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await getQuestions(5);
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

export default MainPage;
