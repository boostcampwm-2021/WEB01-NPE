import React, { FunctionComponent } from "react";

import { Editor } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
interface Props {
  editorRef: any;
  type?: string;
}

const WrappedEditor: FunctionComponent<Props> = (props) => {
  return (
    <Editor
      ref={props.editorRef}
      initialValue={
        props.type === "Answer"
          ? `## 답변을 입력해주세요`
          : `## 질문을 입력해주세요.`
      }
      previewStyle="tab"
      height={props.type === "Answer" ? "300px" : "600px"}
      initialEditType="markdown"
      useCommandShortcut={true}
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
};

export default WrappedEditor;
