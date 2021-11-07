import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  text: string;
  size: string;
}

const SearchInput: FunctionComponent<Props> = ({ text, size }) => {
  if (size === "small") return <Styled.smallInput placeholder={text} />;
  if (size === "medium") return <Styled.mediumInput placeholder={text} />;
  if (size === "large") return <Styled.largeInput placeholder={text} />;
  return <Styled.smallInput placeholder={text} />;
};

export default SearchInput;
