import React, { useState } from "react";
import Button from "./index";
import userImg from "./user.png";
import logoutImg from "./logout.png";

export default {
  title: "Atoms/Button",
  component: Button,
};

export const Default = () => {
  const [text, setText] = useState("로그아웃");
  const onClick = () => {
    setText((text) => (text === "로그아웃" ? "프로필" : "로그아웃"));
  };

  return (
    <Button type="Default" image={logoutImg} text={text} onClick={onClick} />
  );
};

export const Header = () => {
  const [text, setText] = useState("로그인");
  const onClick = () => {
    setText((text) => (text === "로그인" ? "프로필" : "로그인"));
  };
  return <Button type="Header" image={userImg} text={text} onClick={onClick} />;
};
