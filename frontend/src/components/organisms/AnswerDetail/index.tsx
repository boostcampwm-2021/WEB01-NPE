import React, { FunctionComponent } from "react";

import { AnswerDetailType } from "@src/types";
import { DetailBody } from "@components/organisms";
import * as Styled from "./styled";

interface Props {
  answer: AnswerDetailType;
  isAdoptable?: boolean;
}

const AnswerDetail: FunctionComponent<Props> = ({ answer, isAdoptable }) => {
  return (
    <Styled.Container>
      <DetailBody detail={answer} type="Answer" isAdoptable={isAdoptable} />
    </Styled.Container>
  );
};

export default AnswerDetail;
