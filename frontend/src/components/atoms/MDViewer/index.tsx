import React, { FunctionComponent } from "react";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
const MDViewer: FunctionComponent = () => {
  return (
    <Viewer
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      initialValue="
  ```javascript 
    console.log('sdf')
  ```
  "
    />
  );
};

export default MDViewer;
