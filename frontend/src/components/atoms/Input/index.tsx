import React, { forwardRef } from "react";

import * as Styled from "./styled";

interface Props {
  text: string;
  size: string;
}

const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ text, size }, ref) => {
    if (size === "small")
      return <Styled.smallInput placeholder={text} ref={ref} />;
    if (size === "medium")
      return <Styled.mediumInput placeholder={text} ref={ref} />;
    if (size === "large")
      return <Styled.largeInput placeholder={text} ref={ref} />;
    return <Styled.smallInput placeholder={text} />;
  }
);

export default SearchInput;
