import styled from "styled-components";

export const StyledTag = styled.a`
  font-size: 14px;
  border-color: var(--black-primary);
  background-color: var(--orange-tag2);
  color: var(--black-primary);
  padding: 0.4em 0.5em;
  border-width: 1px solid;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
    background-color: var(--orange-tag2-hover);
  }
`;
