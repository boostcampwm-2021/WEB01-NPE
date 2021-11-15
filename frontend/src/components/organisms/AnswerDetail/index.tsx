import React, { FunctionComponent } from "react";

import { AnswerDetailType } from "@src/types";
import { DetailBody } from "@components/organisms";
import * as Styled from "./styled";

interface Props {
  answer: AnswerDetailType;
}

const AnswerDetail: FunctionComponent<Props> = ({ answer }) => {
  return (
    <Styled.Container>
      <DetailBody detail={answer} />
    </Styled.Container>
  );
};

export default AnswerDetail;
