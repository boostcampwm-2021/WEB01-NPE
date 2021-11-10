import Tag from "./";

export default {
  Component: Tag,
  title: "Atoms/Tag",
};

export const Default = () => {
  const onClick = () => {};
  return <Tag type="Default" label="javscript" onClick={onClick} />;
};

export const Gray = () => {
  const onClick = () => {};
  return <Tag type="Gray" label="javscript" onClick={onClick} />;
};
