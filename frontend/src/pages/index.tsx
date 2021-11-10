import React, { useState } from "react";
import { getAllTags } from "../pages/api";
import { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Header from "../components/organisms/Header";
import SideBar from "../components/organisms/SideBar";

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

interface Props {
  tagList: string[];
}

const MainPage: NextPage<Props> = ({ tagList }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [texts, setTexts] = useState<string>("");

  return (
    <>
      <Header type="Default" setTexts={setTexts} />
      <MainContainer>
        <SideBar
          selectedTags={tags}
          setSelectedTags={setTags}
          tagList={tagList}
        />
      </MainContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { error, data } = await getAllTags();
    const tagList = data.getAllTags.map((e: { name: string }) => e.name);

    if (error || !data) {
      return { notFound: true };
    }

    return {
      props: {
        tagList,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default MainPage;
