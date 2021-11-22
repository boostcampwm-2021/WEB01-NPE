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

const languageSupport = [
  "MarkDown",
  "Javascript",
  "C/C++",
  "Java",
  "Kotlin",
  "Python",
  "HTML",
  "Swift",
  "CSS",
];

const gfmLangToMode: Record<string, string> = {
  javascript: "javascript",
  c: "clike",
  cpp: "clike",
  java: "java",
  kotlin: "kotlin",
  python: "python",
  html: "html",
  swift: "swift",
  css: "css",
};

const gfmLangToExtension: Record<string, string> = {
  javascript: "js",
  c: "c",
  cpp: "c++",
  java: "java",
  kotlin: "kt",
  python: "py",
  html: "html",
  swift: "swift",
  css: "css",
};

const langToMode: Record<string, string> = {
  MarkDown: "gfm",
  Javascript: "javascript",
  "C/C++": "clike",
  Java: "clike",
  Kotlin: "clike",
  Python: "python",
  HTML: "htmlmixed",
  Swift: "swift",
  CSS: "css",
};

const langToExtension: Record<string, string> = {
  MarkDown: "md",
  Javascript: "js",
  "C/C++": "c",
  Java: "java",
  Kotlin: "kt",
  Python: "py",
  HTML: "html",
  Swift: "swift",
  CSS: "css",
};

const extensionToLang: Record<string, string> = Object.keys(
  langToExtension
).reduce((obj: Record<string, string>, key) => {
  obj[langToExtension[key]] = key;
  return obj;
}, {});

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
  const addNewTab = (language: string) => () => {
    const extension = langToExtension[language];
    const newTabList = [...tabList, `${tabListIndex}.${extension}`];
    socket.emit("code", {
      tabList: newTabList,
      index: tabListIndex + 1,
    });
    setCurrentEditor(String(`${tabListIndex}.${extension}`));
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
    const language = code.split("\n")[0].slice(3).trim();
    const extension = gfmLangToExtension[language];
    return (
      <Styled.Tab
        focused={currentEditor === `${i}.${extension}`}
        onClick={onTabClick(`${i}.${extension}`)}
        key={`${i}.${extension}`}
      >
        {i}.{extension}
      </Styled.Tab>
    );
  });
  const codeBlockEditor =
    codeBlock?.map((code, i) => {
      const codeOnly = code.split("\n").slice(1).join("\n").slice(0, -3);
      const language = code.split("\n")[0].slice(3).trim();
      const extension = gfmLangToExtension[language];
      const mode = gfmLangToMode[language];
      return (
        currentEditor === `${i}.${extension}` && (
          <Editor
            roomId={`${question.id}-q-${i}.${extension}`}
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
        {name}.{extension}
        <Styled.closeTab onClick={closeTab(tab)}>x</Styled.closeTab>
      </Styled.Tab>
    );
  });
  const newCodeBlockEditor = tabList.map((tab) => {
    const [name, extension] = tab.split(".");
    const mode = langToMode[extensionToLang[extension]];
    return (
      currentEditor === tab && (
        <Editor
          roomId={`${question.id}-${tab}`}
          color={color}
          value=""
          key={tab}
          mode={mode}
        />
      )
    );
  });

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
              {languageSupport.map((language) => (
                <div key={language} onClick={addNewTab(language)}>
                  {language}
                </div>
              ))}
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
