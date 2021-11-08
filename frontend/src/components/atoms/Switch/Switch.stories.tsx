import React, { useState } from "react";
import Switch from "./index";

export default {
  title: "Atoms/Switch",
  component: Switch,
};

export const Default = () => {
  const [check, setCheck] = useState(false);
  return <Switch type="Default" isChecked={check} setIsChecked={setCheck} />;
};

export const DarkMode = () => {
  const [check, setCheck] = useState(false);
  return <Switch type="DarkMode" isChecked={check} setIsChecked={setCheck} />;
};
