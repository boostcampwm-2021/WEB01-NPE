import React, {
  FunctionComponent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import RandomColor from "randomcolor";
import * as Socket from "socket.io-client";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import * as Styled from "./styled";
import Editor from "./editor";
import { QuestionDetailType } from "@src/types";

interface CodeType {
  tabList: string[];
  index: string;
}

interface CodeListType {
  language: string;
  code: string;
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
  markdown: "markdown",
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
  markdown: "md",
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

const extensionToGfmLang: Record<string, string> = Object.keys(
  gfmLangToExtension
).reduce((obj: Record<string, string>, key) => {
  obj[gfmLangToExtension[key]] = key;
  return obj;
}, {});

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
  setCodeList: (value: CodeListType[]) => void;
}> = ({ question, socket, setCodeList }) => {
  const serverUrl =
    process.env.NODE_ENV === "production"
      ? `wss://nullpointerexception.ml/yjs`
      : `ws://localhost:1234`;

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

  const setAllCodes = () =>
    tabList
      .map((tab) => `${question.id}-answer-${tab}`)
      .map((id) => {
        const ydoc = new Y.Doc();
        const provider = new WebsocketProvider(serverUrl, id, ydoc);
        provider.once("synced", () => {
          const text = ydoc.getText("codemirror");
          const newCode: CodeListType = {
            language: extensionToGfmLang[id.split(".")[1]],
            code: text.toString(),
          };
          setCodeList((prev) => [...prev, newCode]);
          provider.disconnect();
        });
      });

  useEffect(() => {
    setCodeList([]);
    setAllCodes();
  }, [tabList]);

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
            key={`${i}.${extension}`}
            serverUrl={serverUrl}
            roomId={`${question.id}-question-${i}.${extension}`}
            color={color}
            value={codeOnly}
            mode={mode}
          />
        )
      );
    }) || "";
  const newCodeBlockTab = tabList.map((tab) => {
    return (
      <Styled.Tab
        focused={currentEditor === tab}
        onClick={onTabClick(tab)}
        key={tab}
      >
        {tab}
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
          serverUrl={serverUrl}
          roomId={`${question.id}-answer-${tab}`}
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
            serverUrl={serverUrl}
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
