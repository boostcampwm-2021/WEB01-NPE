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

const WrappedEditor: FunctionComponent<Props> = (props) => (
  <Editor
    ref={props.editorRef}
    previewStyle="tab"
    initialValue={props.initialValue}
    placeholder="질문을 입력해주세요"
    height={props.type === "Answer" ? "300px" : "600px"}
    initialEditType="markdown"
    useCommandShortcut={true}
    plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
  />
);
export default WrappedEditor;
