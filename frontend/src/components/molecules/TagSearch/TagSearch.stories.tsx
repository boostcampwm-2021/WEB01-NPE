import React from "react";
import TagSearch from "./index";

export default {
  title: "Molecules/TagSearch",
  component: TagSearch,
};

export const Default = () => {
  const tagList = ["react.js", "javascript", "react-router-dom"];

  return (
    <TagSearch 
      tagList={tagList}
      onSubmit={() => {}} 
    />
  );
}