import React, { FunctionComponent, useState } from "react";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import RandomColor from "randomcolor";

import * as Styled from "./styled";
import Editor from "./editor";
import { QuestionDetailType } from "@src/types";

const color = RandomColor();
const gfmCodeReg = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;

const WrappedEditor: FunctionComponent<{
  question: QuestionDetailType;
}> = ({ question }) => {
  const [currentEditor, setCurrentEditor] = useState("question");

  const codeBlock = question.desc.match(gfmCodeReg);

  const onTabClick = (target: string) => () => {
    setCurrentEditor(target);
  };

  const codeBlockTab = codeBlock?.map((_, i) => (
    <Styled.Code
      focused={currentEditor === `Code ${i}`}
      onClick={onTabClick(`Code ${i}`)}
    >
      Code {i}
    </Styled.Code>
  ));
  const codeBlockEditor =
    codeBlock?.map(
      (code, i) =>
        currentEditor === `Code ${i}` && (
          <Editor
            roomId={`${question.id}-code-${i}`}
            color={color}
            value={code}
          />
        )
    ) || "";

  return (
    <Styled.Editor>
      <Styled.Tab>
        <Styled.Code
          focused={currentEditor === "question"}
          onClick={onTabClick("question")}
        >
          질문
        </Styled.Code>
        {codeBlockTab}
        <Styled.Code
          focused={currentEditor === "answer"}
          onClick={onTabClick("answer")}
        >
          답변
        </Styled.Code>
      </Styled.Tab>
      <div>
        {currentEditor === "question" && (
          <Editor
            roomId={`${question.id}-question`}
            color={color}
            value={question.desc}
          />
        )}
        {codeBlockEditor}
        {currentEditor === "answer" && (
          <Editor roomId={`${question.id}-answer`} color={color} />
        )}
      </div>
    </Styled.Editor>
  );
};

export default WrappedEditor;
