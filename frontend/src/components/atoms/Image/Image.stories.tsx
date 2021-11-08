import Image from "./index";

export default {
  Component: Image,
  title: "Atoms/Image",
};

export const Default = () => {
  return (
    <Image
      type="Default"
      src={"https://avatars.githubusercontent.com/u/50866506?v=4"}
    />
  );
};

export const large = () => {
  return (
    <Image
      type="Large"
      src={"https://avatars.githubusercontent.com/u/50866506?v=4"}
    />
  );
};
