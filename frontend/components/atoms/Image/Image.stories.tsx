import Image from "./index";

export default {
  Component: Image,
  title: "Atoms/Image",
};

export const normal = () => {
  return (
    <Image
      src={"https://avatars.githubusercontent.com/u/50866506?v=4"}
      width={24}
      height={24}
    />
  );
};

export const large = () => {
  return (
    <Image
      src={"https://avatars.githubusercontent.com/u/50866506?v=4"}
      width={48}
      height={48}
    />
  );
};
