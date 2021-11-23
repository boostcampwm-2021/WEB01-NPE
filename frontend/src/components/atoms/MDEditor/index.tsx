import React from "react";
import dynamic from "next/dynamic";
interface Props {
  type: "Question" | "Answer";
  initialValue?: string;
}
const WrappedEditor = dynamic(() => import("./WrappedEditor"), { ssr: false });

const MDEditor = React.forwardRef<any, Props>((props, ref) => {
  return (
    <WrappedEditor
      type={props.type}
      editorRef={ref}
      initialValue={props.initialValue}
    />
  );
});
export default MDEditor;
