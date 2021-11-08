import React, { FunctionComponent } from "react";
import { StyledSearchInput } from "./styled";

interface Props {
  placeholder: string;
}

const SearchInput: FunctionComponent<Props> = ({ placeholder }) => {
  return <StyledSearchInput placeholder={placeholder} />;
};

export default SearchInput;
