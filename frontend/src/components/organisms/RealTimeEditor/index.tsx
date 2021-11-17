import React, { FunctionComponent } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";

if (typeof window !== "undefined") {
  require("codemirror/lib/codemirror.css");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/gfm/gfm");
}

import * as Styled from "./styled";
import { QuestionDetailType } from "@src/types";

const RealTimeEditor: FunctionComponent<{ question: QuestionDetailType }> = ({
  question,
}) => {
  console.log(question.desc);

  return (
    <Styled.Editor>
      <Styled.Tab>
        <Styled.Code>버튼1</Styled.Code>
        <Styled.Code>버튼1</Styled.Code>
        <Styled.Code>버튼1</Styled.Code>
        <Styled.Code>버튼1</Styled.Code>
      </Styled.Tab>
      <CodeMirror
        value={question.desc || ""}
        options={{
          mode: "gfm",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {}}
      />
    </Styled.Editor>
  );
};

export default RealTimeEditor;
