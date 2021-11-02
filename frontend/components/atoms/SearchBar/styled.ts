import styled from "styled-components";

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

export { StyledSearchBar };
