import React, {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { StyledSearchInput } from "./styled";

interface Props {
  placeholder: string;
  width: string;
}

const SearchInput: FunctionComponent<Props> = ({ placeholder, width }) => {
  return <StyledSearchInput placeholder={placeholder} width={width} />;
};

export default SearchInput;
