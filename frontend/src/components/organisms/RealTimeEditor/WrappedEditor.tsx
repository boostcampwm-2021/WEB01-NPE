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

const LanguageEnum = {
  javascript: "js",
  gfm: "md",
};

const color = RandomColor();
const gfmCodeReg = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm;

const WrappedEditor: FunctionComponent<{
  question: QuestionDetailType;
  socket: Socket.Socket;
}> = ({ question, socket }) => {
  const [currentEditor, setCurrentEditor] = useState("question");
  const [tabList, setTabList] = useState<string[]>([]);
  const [tabListIndex, setTabListIndex] = useState<number>(0);
  const [isDropdown, setIsDropdown] = useState(false);

  const codeBlock = question.desc.match(gfmCodeReg);

  const onTabClick = (target: string) => () => {
    setCurrentEditor(target);
  };
  const onDropdown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsDropdown(true);
  };
  const onDropDownClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const onReset = () => {
    setIsDropdown(false);
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
  const addNewTab = (mode: string) => () => {
    const newTabList = [...tabList, `${tabListIndex}.${mode}`];
    socket.emit("code", {
      tabList: newTabList,
      index: tabListIndex + 1,
    });
    setCurrentEditor(String(`${tabListIndex}.${mode}`));
    onReset();
  };

  useEffect(() => {
    socket.on("code", (code: CodeType) => {
      setTabList(code.tabList);
      setTabListIndex(Number(code.index));
    });
    socket.emit("code", {});

    document.body.addEventListener("click", onReset);

    return () => {
      document.body.removeEventListener("click", onReset);
    };
  }, []);

  const codeBlockTab = codeBlock?.map((code, i) => {
    const mode = code.split("\n")[0].slice(3).trim();
    return (
      <Styled.Tab
        focused={currentEditor === `${i}.${mode}`}
        onClick={onTabClick(`${i}.${mode}`)}
      >
        {i}.{LanguageEnum[mode]}
      </Styled.Tab>
    );
  });
  const codeBlockEditor =
    codeBlock?.map((code, i) => {
      const codeOnly = code.split("\n").slice(1).join("\n").slice(0, -3);
      const mode = code.split("\n")[0].slice(3).trim();
      return (
        currentEditor === `${i}.${mode}` && (
          <Editor
            roomId={`${question.id}-q-${i}.${mode}`}
            color={color}
            value={codeOnly}
            mode={mode}
          />
        )
      );
    }) || "";
  const newCodeBlockTab = tabList.map((tab) => {
    const [name, extension] = tab.split(".");
    return (
      <Styled.Tab
        focused={currentEditor === tab}
        onClick={onTabClick(tab)}
        key={tab}
      >
        {name}.{LanguageEnum[extension]}
        <Styled.closeTab onClick={closeTab(tab)}>x</Styled.closeTab>
      </Styled.Tab>
    );
  });
  const newCodeBlockEditor = tabList.map(
    (tab) =>
      currentEditor === tab && (
        <Editor
          roomId={`${question.id}-${tab}`}
          color={color}
          value=""
          key={tab}
          mode={tab.split(".")[1]}
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
          {newCodeBlockTab}
        </Styled.TabList>
        <Styled.AddTab>
          <Styled.Tab focused={false} onClick={onDropdown} key="add">
            +
          </Styled.Tab>
          {isDropdown && (
            <Styled.Dropdown onClick={onDropDownClick}>
              <div onClick={addNewTab("gfm")}>markdown</div>
              <div onClick={addNewTab("javascript")}>javascript</div>
            </Styled.Dropdown>
          )}
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
        {newCodeBlockEditor}
      </>
    </Styled.Editor>
  );
};

export default WrappedEditor;
