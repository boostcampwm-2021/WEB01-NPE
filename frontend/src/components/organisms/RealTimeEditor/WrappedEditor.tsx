import React, { FunctionComponent, MouseEvent, useState } from "react";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import RandomColor from "randomcolor";

import * as Styled from "./styled";
import Editor from "./editor";
import { QuestionDetailType } from "@src/types";

const WrappedEditor: FunctionComponent<{
  question: QuestionDetailType;
}> = ({ question }) => {
  const [currentEditor, setCurrentEditor] = useState("question");

  const color = RandomColor();

  const onTabClick = (target: string) => () => {
    setCurrentEditor(target);
  };

  return (
    <Styled.Editor>
      <Styled.Tab>
        <Styled.Code
          focused={currentEditor === "question"}
          onClick={onTabClick("question")}
        >
          질문
        </Styled.Code>
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
            question={question}
            roomId={`${question.id}-question`}
            color={color}
            value={question.desc}
          />
        )}
        {currentEditor === "answer" && (
          <Editor
            question={question}
            roomId={`${question.id}-answer`}
            color={color}
          />
        )}
      </div>
    </Styled.Editor>
  );
};

export default WrappedEditor;
