import React, { FunctionComponent, useState } from "react";
import Header from "../../components/organisms/Header";
import SideBar from "../../components/organisms/SideBar";
import SearchResults from "../../components/templates/SearchResults";
interface Props {}

import styled from "styled-components";

const MainContainer = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const MainPage: FunctionComponent<Props> = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <Header />
      <MainContainer>
        <SideBar selectedTags={tags} setSelectedTags={setTags} />
        <SearchResults />
      </MainContainer>
    </>
  );
};

export default MainPage;
