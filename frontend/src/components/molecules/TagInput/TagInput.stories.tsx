import React, { useState } from "react";
import TagInput from ".";

export default {
  title: "Molecules/TagInput",
  component: TagInput,
};

export const Default = () => {
  const [tags, setTags] = useState<string[]>(["react.js"]);
  return <TagInput tagList={tags} setTagList={setTags} />;
};
