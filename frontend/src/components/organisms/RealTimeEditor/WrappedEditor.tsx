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
  const [tabList, setTabList] = useState<string[]>([]);
  const [tabListIndex, setTabListIndex] = useState<number>(0);

  const codeBlock = question.desc.match(gfmCodeReg);

  const onTabClick = (target: string) => () => {
    setCurrentEditor(target);
  };

  const codeBlockTab = codeBlock?.map((_, i) => (
    <Styled.Tab
      focused={currentEditor === `Code ${i}`}
      onClick={onTabClick(`Code ${i}`)}
    >
      Code {i}
    </Styled.Tab>
  ));
  const codeBlockEditor =
    codeBlock?.map((code, i) => {
      const codeOnly = code.split("\n").slice(1).join("\n").slice(0, -3);
      const mode = code.split("\n")[0].slice(3).trim();
      return (
        currentEditor === `Code ${i}` && (
          <Editor
            roomId={`${question.id}-test-${i}`}
            color={color}
            value={codeOnly}
            mode={mode}
          />
        )
      );
    }) || "";

  return (
    <Styled.Editor>
      <Styled.TabWrapper>
        <Styled.Tab
          focused={currentEditor === "question"}
          onClick={onTabClick("question")}
        >
          질문
        </Styled.Tab>
        {codeBlockTab}
        <Styled.Tab
          focused={currentEditor === "answer"}
          onClick={onTabClick("answer")}
        >
          답변
        </Styled.Tab>
        {tabList.map((tab) => (
          <Styled.Tab
            focused={currentEditor === tab}
            onClick={onTabClick(tab)}
            key={tab}
          >
            Code {tab}
            <Styled.closeTab
              onClick={(e) => {
                e.stopPropagation();
                setTabList(tabList.filter((_tab) => _tab !== tab));
                setCurrentEditor("question");
              }}
            >
              x
            </Styled.closeTab>
          </Styled.Tab>
        ))}
        <Styled.Tab
          focused={false}
          onClick={() => {
            setTabList([...tabList, String(tabListIndex)]);
            setTabListIndex(tabListIndex + 1);
            setCurrentEditor(String(tabListIndex));
          }}
        >
          +
        </Styled.Tab>
      </Styled.TabWrapper>
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
        {tabList.map(
          (tab) =>
            currentEditor === tab && (
              <Editor
                roomId={`${question.id}-${tab}`}
                color={color}
                value=""
                overwrite={true}
              />
            )
        )}
      </div>
    </Styled.Editor>
  );
};

export default WrappedEditor;
