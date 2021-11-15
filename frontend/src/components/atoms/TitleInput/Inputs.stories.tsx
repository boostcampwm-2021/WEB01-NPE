import React, { useState } from "react";
import TitleInput from ".";

export default {
  Component: TitleInput,
  title: "Atoms/TitleInput",
};

export const Default = () => {
  const [text, setText] = useState<string>("");
  return <TitleInput type="Title" setText={setText} />;
};
