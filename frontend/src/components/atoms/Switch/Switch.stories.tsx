import React, { useState } from "react";
import Switch from "./index";

export default {
  title: "Atoms/Switch",
  component: Switch,
};

export const Default = () => {
  const [check, setCheck] = useState(false);
  return (
    <Switch
      isChecked={check}
      setIsChecked={setCheck}
      offColor="#66bb6a"
      onColor="#ccc"
    />
  );
};
