import React from "react";
import ProfileDropDown from "./index";

export default {
  title: "Molecules/ProfileDropDown",
  component: ProfileDropDown,
};

export const Default = () => {
  const onProfile = () => {};
  const onLogout = () => {};
  return <ProfileDropDown onProfile={onProfile} onLogout={onLogout} />;
};
