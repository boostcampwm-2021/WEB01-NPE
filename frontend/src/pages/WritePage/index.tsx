import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import ResisterQuestion from "../../components/templates/ResisterQuestion";
import { Header } from "../../components/organisms";
interface Props {}

const MainContainer = styled.main`
  display: flex;
  width: 800px;
  padding-top: 20px;
  padding-bottom: 100px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const WritePage: FunctionComponent<Props> = () => {
  return (
    <>
      <Header type="Profile" setTexts={() => {}} />
      <MainContainer>
        <ResisterQuestion />
      </MainContainer>
    </>
  );
};

export default WritePage;
