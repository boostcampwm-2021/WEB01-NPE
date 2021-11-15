import React, { FunctionComponent, useRef } from "react";
import dynamic from "next/dynamic";
interface Props {
  type?: string;
}
const WrappedEditor = dynamic(() => import("./WrappedEditor"), { ssr: false });

const MDEditor = React.forwardRef<any, Props>((props, ref) => {
  return <WrappedEditor type={props.type} editorRef={ref} />;
});
export default MDEditor;
