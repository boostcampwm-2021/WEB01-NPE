import React, { FunctionComponent } from "react";

import * as Styled from "./styled";

interface Props {
  placeholder: string;
}

const SearchInput: FunctionComponent<Props> = ({ placeholder }) => {
  return <Styled.SearchInput placeholder={placeholder} />;
};

export default SearchInput;
