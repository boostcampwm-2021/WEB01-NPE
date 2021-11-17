import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { Button, Logo, TitleText, Text } from "@components/atoms";
import { QuestionType } from "@src/types";

const RealTimeModal: FunctionComponent<{ question: QuestionType }> = () => {
  const socket = "?";
  const yjssocket = "?";

  return (
    <Styled.ModalWrapper>
      <Styled.Modal>
        <Styled.temp>
          <div>유저마이크</div>
          <div>파일</div>
          <div>채팅</div>
        </Styled.temp>
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
};

export default RealTimeModal;
