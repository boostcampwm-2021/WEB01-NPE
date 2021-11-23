import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await getQuestions(
        5,
        0,
        texts,
        tagList.map((tag) => Number(tag.id)),
        isLive
      );

      if (data) {
        setQuestionList(data.searchQuestions);
        setIndex(data.searchQuestions.length);
        window.scrollTo(0, 0);
      }
    };
    fetchQuestions();
  }, [tagList, texts, isLive]);

  const getMorePost = async () => {
    const { data } = await getQuestions(
      5,
      index,
      texts,
      tagList.map((tag) => Number(tag.id)),
      isLive
    );
    if (data) {
      const { searchQuestions: fetchData } = data;
      setIndex(index + fetchData.length);
      setQuestionList([...questionList, ...fetchData]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          NullPointerException - 나와봐! 내가 알려줄께: 개발자들을 위한 실시간
          QA 서비스
        </title>
        <meta
          name="description"
          content="나와봐! 내가 알려줄께: 개발자들을 위한 실시간 QA 서비스"
        />
        <meta name="keywords" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NullPointerException" />
        <meta
          property="og:description"
          content="나와봐! 내가 알려줄께: 개발자들을 위한 실시간 QA 서비스"
        />
        <meta
          property="og:image"
          content="https://user-images.githubusercontent.com/50866506/142799853-901b29c1-5836-467e-bf89-f8f37a08a17f.png"
        />
        <meta property="og:site_name" content="NullPointerException" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:url" content={`https://nullpointerexception.ml`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:domain" content="https://nullpointerexception.ml" />
        <meta
          name="twitter:title"
          property="og:title"
          content="NullPointerException"
        />
        <meta
          name="twitter:description"
          property="og:description"
          content="나와봐! 내가 알려줄께: 개발자들을 위한 실시간 QA 서비스"
        ></meta>
      </Head>
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
  const { data } = await getQuestions(5, 0);
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
