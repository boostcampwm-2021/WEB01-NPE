import React, { useState } from "react";
import Button from "./index";
import userImg from "./user.png";
import logoutImg from "./logout.png";

export default {
  title: "Atoms/Button",
  component: Button,
};

export const Default = () => {
  const [text, setText] = useState("로그인");
  const onClick = () => {
    setText((text) => (text === "로그인" ? "프로필" : "로그인"));
  };
  return (
    <Button
      image={userImg}
      text={text}
      bgColor="var(--orange-primary)"
      textColor="var(--white-primary)"
      onClick={onClick}
    />
  );
};

export const Logout = () => {
  const [text, setText] = useState("로그아웃");
  const onClick = () => {
    setText((text) => (text === "로그아웃" ? "프로필" : "로그아웃"));
  };

  return (
    <Button
      image={logoutImg}
      text={text}
      bgColor="var(--white-primary)"
      textColor="var(--black-primary)"
      onClick={onClick}
    />
  );
};

export const OnlyTextButton = () => {
  return (
    <Button
      text="로그인"
      bgColor="var(--orange-primary)"
      textColor="var(--white-primary)"
      onClick={() => {}}
    />
  );
};

export const LongButton = () => {
  const [text, setText] = useState("라이브스트리밍onoff");

  return (
    <Button
      text={text}
      bgColor="var(--white-primary)"
      textColor="var(--black-primary)"
      onClick={() => {}}
      width="200px"
    />
  );
};
