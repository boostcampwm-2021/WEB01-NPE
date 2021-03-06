import React, { useState } from "react";
import SideBar from "./index";

export default {
  title: "Organisms/SideBar",
  component: SideBar,
};

export const Default = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(true);
  return (
    <SideBar
      selectedTags={selectedTags}
      setSelectedTags={setSelectedTags}
      tagList={[]}
      isLive={isLive}
      setIsLive={setIsLive}
    />
  );
};
