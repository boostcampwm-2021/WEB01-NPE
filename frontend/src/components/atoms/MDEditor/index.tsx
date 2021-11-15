import React, { FunctionComponent } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "@toast-ui/editor/dist/toastui-editor.css";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
const Editor = dynamic<EditorProps>(
  () => import("@toast-ui/react-editor").then((m) => m.Editor),
  { ssr: false }
);
// const codeSyntaxHighlight = dynamic(
//   () => import("@toast-ui/editor-plugin-code-syntax-highlight").then((m) => m),
//   { ssr: false }
// );
// const colorSyntax = dynamic(
//   () => import("@toast-ui/editor-plugin-color-syntax").then((m) => m.default),
//   { ssr: false }
// );
interface Props {
  editorRef: any;
  type?: string;
}

const MDEditor: FunctionComponent<Props> = ({ type, editorRef }) => {
  return (
    <Editor
      ref={editorRef}
      initialValue={
        type === "Answer" ? `## 답변을 입력해주세요` : `## 질문을 입력해주세요.`
      }
      previewStyle="tab"
      height={type === "Answer" ? "300px" : "600px"}
      initialEditType="markdown"
      useCommandShortcut={true}
      // plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      // plugins={[codeSyntaxHighlight, { highlighter: Prism }]}
    />
  );
};

export default MDEditor;
