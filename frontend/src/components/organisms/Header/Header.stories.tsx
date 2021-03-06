import React from "react";
import Header from "./index";

export default {
  title: "Organisms/Header",
  component: Header,
};

export const Default = () => {
  return <Header type="Default" />;
};

export const Profile = () => {
  return <Header type="Profile" />;
};
