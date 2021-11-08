import Text from ".";

export default {
  Component: Text,
  title: "Atoms/Text",
};

export const Default = () => {
  return <Text type="Default" text="안녕, world!" />;
};

export const Header = () => {
  return <Text type="Header" text="사용자 아이디" />;
};
