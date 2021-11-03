import React from "react";
import ProfileHeader from "./index";

export default {
  title: "Molecules/ProfileHeader",
  component: ProfileHeader,
};

export const Default = () => {
  const onClick = () => {};
  return (
    <>
      <ProfileHeader
        src={"https://avatars.githubusercontent.com/u/50866506?v=4"}
        text={"사용자아이디"}
        onClick={onClick}
      />
    </>
  );
};

export const ShordId = () => {
  const onClick = () => {};
  return (
    <>
      <ProfileHeader
        src={"https://avatars.githubusercontent.com/u/67536413?v=4"}
        text={"ab"}
        onClick={onClick}
      />
    </>
  );
};

export const LongId = () => {
  const onClick = () => {};
  return (
    <>
      <ProfileHeader
        src={"https://avatars.githubusercontent.com/u/74395374?v=4"}
        text={"조금많이긴사용자아이디"}
        onClick={onClick}
      />
    </>
  );
};
