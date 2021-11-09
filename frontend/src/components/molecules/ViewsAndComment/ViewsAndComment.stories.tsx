import React from "react";
import ViewsAndComment from "./index";

export default {
  title: "Organisms/ViewsAndComment",
  component: ViewsAndComment,
};

export const example = () => {
  return <ViewsAndComment viewCount={32} commentCount={23} />;
};
