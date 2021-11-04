import type { NextPage } from "next";
import { FunctionComponent, MouseEventHandler } from "react";
import { StyledTag } from "./styled";

interface Props {
  label: string;
  onClick: MouseEventHandler;
}

const Tag: FunctionComponent<Props> = ({ label, onClick }) => {
  return <StyledTag onClick={onClick}>{label}</StyledTag>;
};

export default Tag;
