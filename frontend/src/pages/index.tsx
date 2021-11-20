import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { Header, SideBar } from "@components/organisms";
import { QuestionList } from "@components/templates";
import { QuestionType, TagType } from "@src/types";
import { test, getQuestions } from "@src/lib";

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

const MainPage: NextPage<Props> = ({ data, error }) => {
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [texts, setTexts] = useState<string>("");

  const [questionList, setQuestionList] = useState(data.searchQuestions);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(5);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await getQuestions(
        5,
        texts,
        tagList.map((tag) => Number(tag.id)),
        isLive
      );

      if (data) {
        setQuestionList(data.searchQuestions);
      }
    };
    fetchQuestions();
  }, [tagList, texts, isLive]);

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
          selectedTags={tagList}
          setSelectedTags={setTagList}
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
