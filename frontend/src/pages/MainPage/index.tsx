import React, { FunctionComponent, useState } from "react";
import Header from "../../components/organisms/Header";
import SideBar from "../../components/organisms/SideBar";
import SearchResults from "../../components/templates/SearchResults";
import * as Styled from "./styled";
interface Props {}

const MainPage: FunctionComponent<Props> = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <>
      <Header />
      <Styled.MainContainer>
        <SideBar selectedTags={tags} setSelectedTags={setTags} />
        <SearchResults />
      </Styled.MainContainer>
    </>
  );
};

export default MainPage;
