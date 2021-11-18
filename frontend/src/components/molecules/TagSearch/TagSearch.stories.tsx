import React from "react";

import TagSearch from "./index";
import { TagType } from "@src/types";

export default {
  title: "Molecules/TagSearch",
  component: TagSearch,
};

export const Default = () => {
  const tagList: TagType[] = [
    { __typename: "tag", id: "1", name: "react.js" },
    { __typename: "tag", id: "2", name: "javascript" },
    { __typename: "tag", id: "3", name: "typescript" },
  ];

  return <TagSearch onSubmit={() => {}} tagList={tagList} />;
};
