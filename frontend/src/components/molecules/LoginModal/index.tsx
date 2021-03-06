import React, { FunctionComponent } from "react";
import { signIn } from "next-auth/client";

import * as Styled from "./styled";
import { Button, Logo, TitleText, Text } from "@components/atoms";
import Github from "./github.png";

const LoginModal: FunctionComponent = () => {
  const signInGithub = () => {
    signIn("github", { redirect: false });
  };

  return (
    <Styled.Div>
      <Logo type="Short" />
      <TitleText type={"default"} text={"로그인"} />
      <Styled.Divider />
      <Button
        type="Github"
        image={Github}
        text="GitHub 으로 로그인"
        onClick={signInGithub}
      />
      <Text
        type="Header"
        text="개발자들을 위한 실시간 질문/답변 커뮤니티 NPE"
      />
    </Styled.Div>
  );
};

export default LoginModal;
