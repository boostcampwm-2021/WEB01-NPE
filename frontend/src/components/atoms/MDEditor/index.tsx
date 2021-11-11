import React, { FunctionComponent } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

interface Props {
  editorRef: any;
}

const MDEditor: FunctionComponent<Props> = ({ editorRef }) => {
  return (
    <Editor
      ref={editorRef}
      initialValue="## 질문을 입력해주세요."
      previewStyle="tab"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
};

export default MDEditor;
