import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";
import * as Socket from "socket.io-client";

import { QuestionDetailType } from "@src/types";

const WrappedEditor = dynamic(() => import("./WrappedEditor"), {
  ssr: false,
});

interface CodeListType {
  language: string;
  code: string;
}

const RealTimeEditor: FunctionComponent<{
  question: QuestionDetailType;
  socket: Socket.Socket;
  setCodeList: (value: CodeListType[]) => void;
}> = ({ question, socket, setCodeList }) => {
  return (
    <WrappedEditor
      question={question}
      socket={socket}
      setCodeList={setCodeList}
    />
  );
};

export default RealTimeEditor;
