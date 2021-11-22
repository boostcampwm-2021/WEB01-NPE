import React, {
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import RandomColor from "randomcolor";
import * as Socket from "socket.io-client";

import * as Styled from "./styled";
import Editor from "./editor";
import { QuestionDetailType } from "@src/types";

interface CodeType {
  tabList: string[];
  index: string;
}

const color = RandomColor();
const gfmCodeReg = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;

const WrappedEditor: FunctionComponent<{
  question: QuestionDetailType;
  socket: Socket.Socket;
}> = ({ question, socket }) => {
  const [currentEditor, setCurrentEditor] = useState("question");
  const [tabList, setTabList] = useState<string[]>([]);
  const [tabListIndex, setTabListIndex] = useState<number>(0);

  const codeBlock = question.desc.match(gfmCodeReg);

  const onTabClick = (target: string) => () => {
    setCurrentEditor(target);
  };
  const closeTab = (tab: string) => (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const newTabList = tabList.filter((_tab) => _tab !== tab);
    socket.emit("code", {
      tabList: newTabList,
      index: tabListIndex,
    });
    setCurrentEditor("question");
  };
  const addNewTab = () => {
    const newTabList = [...tabList, String(tabListIndex)];
    socket.emit("code", {
      tabList: newTabList,
      index: tabListIndex + 1,
    });
    setCurrentEditor(String(tabListIndex));
  };

  useEffect(() => {
    socket.on("code", (code: CodeType) => {
      setTabList(code.tabList);
      setTabListIndex(Number(code.index));
    });
    socket.emit("code", {});
  }, []);

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
  const newCodeBlockTab = tabList.map((tab) => (
    <Styled.Tab
      focused={currentEditor === tab}
      onClick={onTabClick(tab)}
      key={tab}
    >
      Code {tab}
      <Styled.closeTab onClick={closeTab(tab)}>x</Styled.closeTab>
    </Styled.Tab>
  ));
  const newCodeBlockEditor = tabList.map(
    (tab) =>
      currentEditor === tab && (
        <Editor
          roomId={`${question.id}-${tab}`}
          color={color}
          value=""
          key={tab}
        />
      )
  );

  return (
    <Styled.Editor>
      <Styled.TabWrapper>
        <Styled.TabList>
          <Styled.Tab
            focused={currentEditor === "question"}
            onClick={onTabClick("question")}
            key="question"
          >
            질문
          </Styled.Tab>
          {codeBlockTab}
          <Styled.Tab
            key="answer"
            focused={currentEditor === "answer"}
            onClick={onTabClick("answer")}
          >
            답변
          </Styled.Tab>
          {newCodeBlockTab}
        </Styled.TabList>
        <Styled.AddTab>
          <Styled.Tab focused={false} onClick={addNewTab} key="add">
            +
          </Styled.Tab>
        </Styled.AddTab>
      </Styled.TabWrapper>
      <>
        {currentEditor === "question" && (
          <Editor
            roomId={`${question.id}-question`}
            color={color}
            value={question.desc}
            key="question"
          />
        )}
        {codeBlockEditor}
        {currentEditor === "answer" && (
          <Editor roomId={`${question.id}-answer`} color={color} key="answer" />
        )}
        {newCodeBlockEditor}
      </>
    </Styled.Editor>
  );
};

export default WrappedEditor;
