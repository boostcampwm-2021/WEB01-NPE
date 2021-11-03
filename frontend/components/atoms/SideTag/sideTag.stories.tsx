import React, { useState } from "react";
import SideTag from "./index";

export default {
  title: "Atoms/SideTag",
  component: SideTag,
};

export const Default = () => {
  return <SideTag text="react.js" deleteHadler={() => {}} />;
};

export const LongTag = () => {
  return <SideTag text="javascript webpack" deleteHadler={() => {}} />;
};

export const otherColorTag = () => {
  return (
    <SideTag text="javascript" tagBgColor="#045D8B" deleteHadler={() => {}} />
  );
};
