import Tag from "./";
import * as Type from "../../../types";
export default {
  Component: Tag,
  title: "Atoms/Tag",
};

export const Default = () => {
  const onClick = () => {};
  const tag: Type.Tag = {
    __typename: "Tag",
    name: "javascript",
  };
  return <Tag type="Default" tag={tag} onClick={onClick} />;
};

export const Gray = () => {
  const tag: Type.Tag = {
    __typename: "Tag",
    name: "javascript",
  };
  const onClick = () => {};
  return <Tag type="Gray" tag={tag} onClick={onClick} />;
};
