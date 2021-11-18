import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { QuestionDetailType } from "@src/types";

const WrappedEditor = dynamic(() => import("./WrappedEditor"), {
  ssr: false,
});

const RealTimeEditor: FunctionComponent<{
  question: QuestionDetailType;
}> = ({ question }) => {
  return <WrappedEditor question={question} />;
};

export default RealTimeEditor;
