import React from "react";
import IconWithNumber from "./index";
import comments from "./comments.png";
import views from "./views.png";
export default {
  title: "Atoms/IconWithNumber",
  component: IconWithNumber,
};

export const Comments = () => {
  return <IconWithNumber type="Comments" value={32} />;
};

export const Views = () => {
  return <IconWithNumber type="Views" value={150} />;
};
