import React from "react";
import TagList from "./index";

export default {
  title: "Molecules/TagList",
  component: TagList,
};

export const exmaple = () => {
  const tags = [
    {
      __typename: "Tag",
      name: "React",
    },
    {
      __typename: "Tag",
      name: "Javascript",
    },
  ];
  return (
    <>
      <TagList tags={tags} />
    </>
  );
};
