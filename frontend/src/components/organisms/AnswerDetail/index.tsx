import React, { FunctionComponent, MouseEventHandler } from "react";
import { AnswerDetailType } from "@src/types";
import { DetailBody } from "@components/organisms";

interface Props {
  answer: AnswerDetailType;
}

const AnswerDetail: FunctionComponent<Props> = ({ answer }) => {
  return (
    <>
      <DetailBody detail={answer} />
    </>
  );
};

export default AnswerDetail;
