import React from "react";
import LoginModal from "./index";

export default {
  title: "Molecules/LoginModal",
  component: LoginModal,
};

export const Default = () => {
  const onClick = () => {};
  return <LoginModal onClick={onClick} />;
};
