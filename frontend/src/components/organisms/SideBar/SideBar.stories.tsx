import React, { useState } from "react";
import SideBar from "./index";

export default {
  title: "Organisms/SideBar",
  component: SideBar,
};

export const Default = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  return (
    <SideBar selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
  );
};
