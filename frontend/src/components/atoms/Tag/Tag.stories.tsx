import Tag from ".";

export default {
  Component: Tag,
  title: "Atoms/Tag",
};

export const javascript = () => {
  const onClick = () => {};
  return (
    <>
      <Tag label="javscript" onClick={onClick} />
    </>
  );
};

export const react = () => {
  const onClick = () => {};
  return (
    <>
      <Tag label="react" onClick={onClick} />
    </>
  );
};
