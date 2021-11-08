import React from "react";
import Logo from "./index";

export default {
  title: "Atoms/Logo",
  component: Logo,
};

export const Default = () => {
  return <Logo type="Default" />;
};

export const Short = () => {
  return <Logo type="Short" />;
};
