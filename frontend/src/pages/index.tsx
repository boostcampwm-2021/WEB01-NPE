import { NextPage, GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Header, SideBar } from "@components/organisms";
import { QuestionList } from "@components/templates";
import { Question } from "@src/types";
import { getQuestions, getAllTags } from "@src/lib";

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
interface TagProps {
  id: number;
  name: string;
}

const MainPage: NextPage<Props> = ({ data, error }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [texts, setTexts] = useState<string>("");
  const [tagList, setTagList] = useState<TagProps[]>([]);
  const [searchQuestions, setSearchQuestions] = useState(data.searchQuestions);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await getAllTags();
      if (data) {
        const tagList = data.getAllTags;
        setTagList(tagList);
      }
    };
    fetchTags();
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      const tagIDs = tags.map(
        (e) => Number(tagList.find((v) => e === v.name)?.id) || -1
      );
      const { data } = await getQuestions(5, texts, tagIDs);

      if (data) {
        setSearchQuestions(data.searchQuestions);
      }
    };
    fetchQuestions();
  }, [tags, texts]);

  return (
    <>
      <Header type="Default" setTexts={setTexts} />
      <MainContainer>
        <SideBar
          selectedTags={tags}
          setSelectedTags={setTags}
          tagList={tagList.map((e) => e.name)}
        />
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
