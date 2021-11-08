import React from "react";
import ProfileWithInfo from "./index";

export default {
  title: "Molecules/ProfileWithInfo",
  component: ProfileWithInfo,
};

export const Default = () => {
  return (
    <ProfileWithInfo
      src={"https://avatars.githubusercontent.com/u/67536413"}
      name={"hwangwoojin"}
      rank={"master"}
    />
  );
};
