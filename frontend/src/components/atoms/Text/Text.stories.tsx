import Text from ".";

export default {
  Component: Text,
  title: "Atoms/Text",
};

export const normal = () => {
  return <Text text="안녕, world!" />;
};

export const color = () => {
  return <Text text="안녕, world!" color="red" />;
};

export const example = () => {
  return (
    <>
      <Text text="조회수" />
      <Text text="&nbsp;3" color="var(--grey-primary)" />
      <Text text="&nbsp;작성일" />
      <Text text="&nbsp;2021-10-10" color="var(--grey-primary)" />
    </>
  );
};
