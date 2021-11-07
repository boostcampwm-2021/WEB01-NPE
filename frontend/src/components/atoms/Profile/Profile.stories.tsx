import React from "react";
import Profile from "./index";

export default {
  title: "Atoms/Profile",
  component: Profile,
};

export const SmallProfile = () => {
  return (
    <Profile
      src={"https://avatars.githubusercontent.com/u/67536413"}
      size={"small"}
    />
  );
};

export const MediumProfile = () => {
  return (
    <Profile
      src={"https://avatars.githubusercontent.com/u/67536413"}
      size={"medium"}
    />
  );
};

export const LargeProfile = () => {
  return (
    <Profile
      src={"https://avatars.githubusercontent.com/u/67536413"}
      size={"large"}
    />
  );
};
