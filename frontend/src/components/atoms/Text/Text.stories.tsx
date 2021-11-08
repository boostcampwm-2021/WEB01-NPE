import Text from ".";

export default {
  Component: Text,
  title: "Atoms/Text",
};

export const ProfileHeader = () => {
  return <Text message="profileHeader" text="Hwangwoojin" />;
};

export const ProfileContent = () => {
  return <Text message="profileContent" text="Platinum" />;
};
