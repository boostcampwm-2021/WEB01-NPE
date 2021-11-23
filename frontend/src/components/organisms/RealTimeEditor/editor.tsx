import React, { FunctionComponent, useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { CodemirrorBinding } from "y-codemirror";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/swift/swift";
import "codemirror/mode/css/css";
import { useSession } from "next-auth/client";

const Editor: FunctionComponent<{
  roomId: string;
  color: string;
  value?: string;
  mode?: string;
}> = ({ roomId, color, value, mode }) => {
  const [editorRef, setEditorRef] = useState(null);
  const [session] = useSession();

  const onEditorDidMount = (editor: CodeMirror.Editor) => {
    setEditorRef(editor);
  };

  const setDefaultVal = (ytext: Y.Text) => {
    if (value && ytext.toString() === "") ytext.insert(0, value);
  };

  useEffect(() => {
    if (!editorRef) return;

    const yjsEndpoint =
      process.env.NODE_ENV === "production"
        ? `wss://nullpointerexception.ml/socket`
        : `ws://localhost:1234`;
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(yjsEndpoint, roomId, ydoc);
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
        mode: mode || "gfm",
        theme: "material",
        lineNumbers: true,
      }}
      editorDidMount={onEditorDidMount}
    />
  );
};

export default Editor;
