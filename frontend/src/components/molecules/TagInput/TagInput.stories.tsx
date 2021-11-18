import React, { useState } from "react";

import TagInput from ".";
import { TagType } from "@src/types";

export default {
  title: "Molecules/TagInput",
  component: TagInput,
};

export const Default = () => {
  const tagList: TagType[] = [
    { __typename: "tag", id: "1", name: "react.js" },
    { __typename: "tag", id: "2", name: "javascript" },
    { __typename: "tag", id: "3", name: "typescript" },
  ];

  return <TagInput tagList={[]} setTagList={() => {}} />;
};
