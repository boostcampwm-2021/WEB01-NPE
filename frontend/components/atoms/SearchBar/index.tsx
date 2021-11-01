import React, {
  FunctionComponent,
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import Image from "next/image";
import { StyledSearchBar } from "./styled";

const SearchBar: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    setInputValue("");
  };

  return (
    <StyledSearchBar>
      <form onSubmit={submitHandler}>
        <input
          value={inputValue}
          onChange={inputHandler}
          placeholder="Search..."
        />
      </form>
      <button type="submit">
        <Image
          src="/img/search-btn.svg"
          alt="search button"
          width={40}
          height={40}
          className="search-btn"
        />
      </button>
    </StyledSearchBar>
  );
};

export default SearchBar;
