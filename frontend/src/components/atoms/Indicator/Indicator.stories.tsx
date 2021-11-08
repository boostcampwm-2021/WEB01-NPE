import React from "react";
import Indicator from "./index";

export default {
  title: "Atoms/Indicator",
  component: Indicator,
};

export const online = () => {
  return <Indicator type="online" />;
};

export const offline = () => {
  return <Indicator type="offline" />;
};
