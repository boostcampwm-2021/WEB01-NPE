import React, { FunctionComponent } from "react";

import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
interface Props {
  editorRef: any;
  type: "Question" | "Answer";
  initialValue?: string;
}

const WrappedEditor: FunctionComponent<Props> = (props) => {
  let height = "0";
  let initialValue = "";
  if (!props.initialValue) {
    switch (props.type) {
      case "Answer":
        initialValue = `## 답변을 입력해주세요`;
        height = "300px";
        break;
      case "Question":
        initialValue = `## 질문을 입력해주세요`;
        height = "600px";
        break;
    }
  } else {
    initialValue = props.initialValue;
  }

  return (
    <Editor
      ref={props.editorRef}
      initialValue={initialValue}
      previewStyle="tab"
      height={height}
      initialEditType="markdown"
      useCommandShortcut={true}
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
};

export default WrappedEditor;
