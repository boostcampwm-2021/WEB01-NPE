import React, { useState } from "react";
import SideTag from "./index";

export default {
  title: "Atoms/SideTag",
  component: SideTag,
};

export const Default = () => {
  return <SideTag text="react.js" onDelete={() => {}} />;
};

export const LongTag = () => {
  return <SideTag text="javascript webpack" onDelete={() => {}} />;
};

export const otherColorTag = () => {
  return (
    <SideTag text="javascript" tagBgColor="#045D8B" onDelete={() => {}} />
  );
};
