import React, { FunctionComponent } from "react";
import { StyledIndicator } from "./styled";

interface Props {
  isOnline: boolean;
  width?: string;
  height?: string;
}

const Indicator: FunctionComponent<Props> = ({ isOnline, width, height }) => {
  if (isOnline) {
    return (
      <StyledIndicator
        title="현재 라이브 답변을 대기중에 있습니다."
        bgColor="var(--green-primary)"
        width={width || "16px"}
        height={height || "16px"}
      />
    );
  } else {
    return (
      <StyledIndicator
        title="현재 질문자가 오프라인 상태입니다."
        bgColor="var(--red-primary)"
        width={width || "16px"}
        height={height || "16px"}
      />
    );
  }
};

export default Indicator;
