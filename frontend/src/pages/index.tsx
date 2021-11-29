import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { Header, LeaderBoard, SideBar } from "@components/organisms";
import { QuestionList, SEOHeader } from "@components/templates";
import { QuestionType, TagType } from "@src/types";
import { test, getQuestions, getUsersRank, getQuestionsRank } from "@src/lib";

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
  userRank: any;
  questionRank: any;
}

const MainPage: NextPage<Props> = ({ data, error, userRank, questionRank }) => {
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [texts, setTexts] = useState<string>("");

  const [questionList, setQuestionList] = useState(data.searchQuestions);
  const [hasMore, setHasMore] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);

  const reset = () => {
    setTagList([]);
    setTexts("");
  };

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
        setQuestionIndex(data.searchQuestions.length);
        window.scrollTo(0, 0);
      }
    };
    fetchQuestions();
  }, [tagList, texts, isLive]);

  const getMorePost = async () => {
    const { data } = await getQuestions(
      5,
      questionIndex,
      texts,
      tagList.map((tag) => Number(tag.id)),
      isLive
    );
    if (data) {
      const { searchQuestions: fetchData } = data;
      setQuestionIndex(questionIndex + fetchData.length);
      setQuestionList([...questionList, ...fetchData]);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      <SEOHeader
        title="NullPointerException - 나와봐! 내가 알려줄께: 개발자들을 위한 실시간
          QA 서비스"
        description="나와봐! 내가 알려줄께: 개발자들을 위한 실시간 QA 서비스"
        imageUrl="https://user-images.githubusercontent.com/50866506/142799853-901b29c1-5836-467e-bf89-f8f37a08a17f.png"
        siteUrl="https://nullpointerexception.ml"
      />
      <Header type="Default" setTexts={setTexts} onResetState={reset} />
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
          loader={<></>}
          endMessage={<></>}
        >
          <QuestionList questions={questionList} />
        </InfiniteScroll>
        <LeaderBoard
          userRank={userRank.getUsersRank}
          questionRank={questionRank.getQuestionsRank}
        />
      </MainContainer>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await getQuestions(5, 0);
  const { data: userRank } = await getUsersRank();
  const { data: questionRank } = await getQuestionsRank();
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
      userRank,
      questionRank,
    },
  };
};

export default MainPage;
