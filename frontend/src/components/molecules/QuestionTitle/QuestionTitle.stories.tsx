import React from "react";
import QuestionTitle from "./index";

export default {
  title: "Molecules/QuestionTitle",
  component: QuestionTitle,
};

export const Online = () => {
  return (
    <>
      <QuestionTitle text={"hello"} type="online" />
    </>
  );
};

export const Offline = () => {
  return (
    <>
      <QuestionTitle text={"hello"} type="offline" />
    </>
  );
};
