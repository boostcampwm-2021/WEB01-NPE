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
      bgColor="#F48024"
      textColor="white"
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
      bgColor="#fff"
      textColor="black"
      onClick={onClick}
    />
  );
};

export const OnlyTextButton = () => {
  return (
    <Button
      text="로그인"
      bgColor="#F48024"
      textColor="white"
      onClick={() => {}}
    />
  );
};

export const LongButton = () => {
  const [text, setText] = useState("라이브스트리밍onoff");

  return (
    <Button
      text={text}
      bgColor="#fff"
      textColor="black"
      onClick={() => {}}
      width="200px"
    />
  );
};
