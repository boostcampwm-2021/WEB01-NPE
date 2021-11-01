import React, { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import Image from "next/image";

function SearchBar() {
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
}

const StyledSearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 643px;
  input {
    border: none;
    border-bottom: 2px solid #f48024;
    :focus {
      outline: none;
    }
    margin-right: 10px;
  }
  button {
    outline: none;
    background-color: transparent;
    border: none;
  }
`;

export default SearchBar;
