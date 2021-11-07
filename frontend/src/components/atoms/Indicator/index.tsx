import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  isOnline: boolean;
}

const Indicator: FunctionComponent<Props> = ({ isOnline }) => {
  return (
    <Styled.Indicator
      title={
        isOnline
          ? "현재 라이브 답변을 대기중에 있습니다."
          : "현재 질문자가 오프라인 상태입니다."
      }
      bgColor={isOnline ? "#6cc16f" : "#e26a61"}
    />
  );
};

export default Indicator;
