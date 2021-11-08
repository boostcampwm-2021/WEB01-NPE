import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";
import Github from "./github.png";

const LoginModal: FunctionComponent<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Styled.Div>
      <Atoms.Logo message="short" />
      <Atoms.TitleText text={"로그인"} />
      <Styled.Divider />
      <Atoms.Button
        text={"GitHub 으로 로그인"}
        bgColor={"#000"}
        textColor={"#fff"}
        image={Github}
        width={"100%"}
        height={"40px"}
        onClick={onClick}
      />
      <Atoms.Text
        message="profileHeader"
        text={"개발자들을 위한 실시간 질문/답변 커뮤니티 NPE"}
      />
    </Styled.Div>
  );
};

export default LoginModal;
