import React from "react";
import Logo from "./index";

export default {
  title: "Atoms/Logo",
  component: Logo,
};

export const Short = () => {
  return <Logo message={"short"} />;
};

export const Long = () => {
  return <Logo message={"long"} />;
};
