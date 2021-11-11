import React, { useRef } from "react";
import MDEditor from ".";

export default {
  Component: MDEditor,
  title: "Atoms/MDEditor",
};

export const Default = () => {
  const ref = useRef();
  return <MDEditor editorRef={ref} />;
};
