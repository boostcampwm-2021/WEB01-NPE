import React, { FunctionComponent, useState } from "react";
import { NextPage } from "next";
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

const MainPage: NextPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <Header type="Default" />
      <MainContainer>
        <SideBar selectedTags={tags} setSelectedTags={setTags} />
      </MainContainer>
    </>
  );
};

export default MainPage;
