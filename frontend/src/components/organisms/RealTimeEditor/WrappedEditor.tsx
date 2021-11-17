import React, { FunctionComponent, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/gfm/gfm";

import * as Styled from "./styled";
import { QuestionDetailType } from "@src/types";

const WrappedEditor: FunctionComponent<{ question: QuestionDetailType }> = ({
  question,
}) => {
  const [editorRef, setEditorRef] = useState(null);

  const onEditorDidMount = (editor: CodeMirror.Editor) => {
    setEditorRef(editor);
  };

  const setDefaultVal = (ytext: Y.Text) => {
    if (ytext.toString() === "") {
      ytext.insert(0, question.desc);
    }
  };

  useEffect(() => {
    if (!editorRef) return;

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", "test", ydoc);
    const yText = ydoc.getText("codemirror");
    const yUndoManager = new Y.UndoManager(yText);
    provider.awareness.setLocalStateField("user", {
      name: "Users Name",
    });
    console.log(provider.synced, yText.toString());
    if (provider.synced) {
      setDefaultVal(yText);
    } else {
      provider.once("synced", () => setDefaultVal(yText));
    }
    const binding = new CodemirrorBinding(
      yText,
      editorRef!,
      provider.awareness,
      {
        yUndoManager,
      }
    );

    return () => {
      if (provider) {
        provider.disconnect();
        ydoc.destroy();
      }
    };
  }, [editorRef]);

  return (
    <Styled.Editor>
      <Styled.Tab>
        <Styled.Code>버튼1</Styled.Code>
        <Styled.Code>버튼1</Styled.Code>
        <Styled.Code>버튼1</Styled.Code>
        <Styled.Code>버튼1</Styled.Code>
      </Styled.Tab>
      <CodeMirror
        options={{
          mode: "gfm",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {}}
        editorDidMount={onEditorDidMount}
      />
    </Styled.Editor>
  );
};

export default WrappedEditor;
