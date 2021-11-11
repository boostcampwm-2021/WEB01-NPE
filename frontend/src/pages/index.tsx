import { Header, SideBar } from "@components/organisms";
import { QuestionList } from "@components/templates";
import { NextPage } from "next";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { QuestionData } from "../types";
import { getQuestions } from "../lib/api";
import { useState } from "react";


const MainContainer = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;
  
  
interface Props {
  data: QuestionData;
  error: any;
}

const MainPage: NextPage<Props> = ({ data }) => {
  const [tags, setTags] = useState([]);
  const { searchQuestions } = data;
  return (
    <>
      <Header type="Default"/>
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

