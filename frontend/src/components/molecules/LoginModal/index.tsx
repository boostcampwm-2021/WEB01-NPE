import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";
import Github from "./github.png";

const LoginModal: FunctionComponent<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Styled.Div>
      <Atoms.Logo type="Short" />
      <Atoms.TitleText type={"default"} text={"로그인"} />
      <Styled.Divider />
      <Atoms.Button
        type="Github"
        image={Github}
        text="GitHub 으로 로그인"
        onClick={onClick}
      />
      <Atoms.Text
        type="Header"
        text="개발자들을 위한 실시간 질문/답변 커뮤니티 NPE"
      />
    </Styled.Div>
  );
};

export default LoginModal;
