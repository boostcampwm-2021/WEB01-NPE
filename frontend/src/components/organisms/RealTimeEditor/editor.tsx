import React, { FunctionComponent, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import { useSession } from "next-auth/client";

import { QuestionDetailType } from "@src/types";

const Editor: FunctionComponent<{
  roomId: string;
  color: string;
  value?: string;
}> = ({ roomId, color, value }) => {
  const [editorRef, setEditorRef] = useState(null);
  const [session] = useSession();

  const onEditorDidMount = (editor: CodeMirror.Editor) => {
    setEditorRef(editor);
  };

  const setDefaultVal = (ytext: Y.Text) => {
    if (value && ytext.toString() === "") {
      ytext.insert(0, value);
    }
  };

  useEffect(() => {
    if (!editorRef) return;

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "ws://101.101.217.233:1234",
      roomId,
      ydoc
    );
    const yText = ydoc.getText("codemirror");
    const yUndoManager = new Y.UndoManager(yText);
    provider.awareness.setLocalStateField("user", {
      name: session?.user?.name,
      color: color,
    });
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
      }
    };
  }, [editorRef]);

  return (
    <CodeMirror
      options={{
        mode: "gfm",
        theme: "material",
        lineNumbers: true,
      }}
      editorDidMount={onEditorDidMount}
    />
  );
};

export default Editor;
