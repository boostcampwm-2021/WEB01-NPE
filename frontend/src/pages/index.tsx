import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { Header, SideBar } from "@components/organisms";
import { QuestionList } from "@components/templates";
import { QuestionType } from "@src/types";
import { test, getQuestions, getAllTags } from "@src/lib";

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

interface Data {
  searchQuestions: QuestionType[];
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
  const [tagList, setTagList] = useState<TagProps[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [texts, setTexts] = useState<string>("");

  const [questionList, setQuestionList] = useState(data.searchQuestions);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(5);

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
      console.log(isLive);
      const { data } = await getQuestions(5, texts, tagIDs, isLive);

      if (data) {
        setQuestionList(data.searchQuestions);
      }
    };
    fetchQuestions();
  }, [tags, texts, isLive]);

  const getMorePost = async () => {
    const { data } = await test(5, index);
    if (data) {
      const { searchQuestions: fetchData } = data;
      setIndex(index + 5);
      setQuestionList([...questionList, ...fetchData]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <Header type="Default" setTexts={setTexts} />
      <MainContainer>
        <SideBar
          selectedTags={tags}
          setSelectedTags={setTags}
          tagList={tagList.map((e) => e.name)}
          isLive={isLive}
          setIsLive={setIsLive}
        />

        <InfiniteScroll
          dataLength={questionList.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <QuestionList questions={questionList} />
        </InfiniteScroll>
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
