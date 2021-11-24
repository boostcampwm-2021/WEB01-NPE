import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Logo, HeaderText, Button } from "@components/atoms";
import { Header } from "@components/organisms";

const Custom404: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header type="Default" setTexts={() => {}} />
      <Wrapper>
        <div>
          <Logo type="Short128" />
        </div>
        <HeaderText type="Default" text="페이지를 발견할 수 없습니다." />
        <ButtonDiv>
          <Button
            type="Submit"
            text="메인화면으로 돌아가기"
            onClick={() => router.push("/")}
          />
        </ButtonDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    margin: 20px;
  }
`;

const ButtonDiv = styled.div`
  width: 300px;
`;

export default Custom404;
