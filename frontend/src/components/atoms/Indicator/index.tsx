import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
interface StyleProps {
  title: string;
  bgColor: string;
  width: string;
  height: string;
}

const types: { [key: string]: StyleProps } = {
  online: {
    title: "현재 라이브 답변을 대기중에 있습니다.",
    bgColor: "#6cc16f",
    width: "16px",
    height: "16px",
  },
  offline: {
    title: "현재 질문자가 오프라인 상태입니다.",
    bgColor: "#e26a61",
    width: "16px",
    height: "16px",
  },
};

const Indicator: FunctionComponent<{ type: string }> = ({ type }) => {
  const styleProps = types[type];
  return <Styled.Indicator {...styleProps} />;
};

export default Indicator;
