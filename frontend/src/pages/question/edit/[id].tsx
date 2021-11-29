import React from "react";
import styled from "styled-components";
import { ResisterQuestion } from "@components/templates";
import { Header } from "@components/organisms";
import { NextPage } from "next";
import { useRouter } from "next/router";
const MainContainer = styled.main`
  display: flex;
  width: 800px;
  padding-top: 20px;
  padding-bottom: 100px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const EditPage: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <Header type="Profile" setTexts={() => {}} />
      <MainContainer>
        <ResisterQuestion type="Edit" questionIdToEdit={Number(id)} />
      </MainContainer>
    </>
  );
};

export default EditPage;
