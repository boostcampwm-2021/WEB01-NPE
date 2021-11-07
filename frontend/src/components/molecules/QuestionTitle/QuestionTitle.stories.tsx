import React from "react";
import QuestionTitle from "./index";

export default {
  title: "Molecules/QuestionTitle",
  component: QuestionTitle,
};

export const Default = () => {
  return (
    <>
      <QuestionTitle text={"hello"} isOnline={false} />
    </>
  );
};
