import React from "react";
import IconWithNumber from "./index";

export default {
  title: "Atoms/IconWithNumber",
  component: IconWithNumber,
};

export const Comments = () => {
  return <IconWithNumber type="Answers" value={32} />;
};

export const Views = () => {
  return <IconWithNumber type="Views" value={150} />;
};
