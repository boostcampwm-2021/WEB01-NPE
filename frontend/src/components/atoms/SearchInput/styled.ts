import styled from "styled-components";

const StyledSearchInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid var(--orange-primary);
  :focus {
    outline: none;
  }
  margin-right: 10px;
`;

export { StyledSearchInput };
