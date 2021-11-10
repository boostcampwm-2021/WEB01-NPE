import React, { useState } from "react";
import SideTag from "./index";

export default {
  title: "Atoms/SideTag",
  component: SideTag,
};

export const Default = () => {
  return <SideTag type="Default" text="react.js" onDelete={() => {}} />;
};
