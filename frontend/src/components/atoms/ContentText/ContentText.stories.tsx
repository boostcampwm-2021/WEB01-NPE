import ContentText from ".";

export default {
  Component: ContentText,
  title: "Atoms/ContentText",
};

export const Default = () => {
  return <ContentText type="Default" text="안녕, world!" />;
};
