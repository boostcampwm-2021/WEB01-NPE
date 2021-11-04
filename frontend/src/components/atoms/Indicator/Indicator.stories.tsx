import React from "react";
import Indicator from "./index";

export default {
  title: "Atoms/Indicator",
  component: Indicator,
};

export const Default = () => {
  return <Indicator isOnline={true} />;
};

export const Offline = () => {
  return <Indicator isOnline={false} />;
};

export const BigButton = () => {
  return <Indicator isOnline={false} width={"30px"} height={"30px"} />;
};
