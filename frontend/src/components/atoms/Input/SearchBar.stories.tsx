import React from "react";
import Input from "./index";

export default {
  title: "Atoms/Input",
  component: Input,
};

export const Small = () => {
  return <Input text="Search..." size="small" />;
};

export const Medium = () => {
  return <Input text="Search..." size="medium" />;
};

export const Long = () => {
  return <Input text="Search..." size="large" />;
};
