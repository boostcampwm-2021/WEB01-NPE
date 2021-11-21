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

  if (props.type === "Answer") {
    initialValue = props.initialValue ?? `## 답변을 입력해주세요`;
    height = "300px";
  } else if (props.type === "Question") {
    initialValue = props.initialValue ?? `## 질문을 입력해주세요`;
    height = "600px";
  }

  console.log(initialValue);
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
