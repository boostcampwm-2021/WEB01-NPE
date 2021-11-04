import React from "react";
import Header from "./index";

export default {
  title: "Organisms/Header",
  component: Header,
};

export const Default = () => {
  return (
    <>
      <Header />
    </>
  );
};

export const LoggedIn = () => {
  return (
    <>
      <Header
        userName="hwangwoojin"
        userImage="https://avatars.githubusercontent.com/u/50866506?v=4"
      />
    </>
  );
};
