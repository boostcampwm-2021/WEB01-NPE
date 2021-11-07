import styled from "styled-components";

const input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid #f48024;
  :focus {
    outline: none;
  }
  margin-right: 10px;
`;

export const smallInput = styled(input)`
  width: 100px;
`;
export const mediumInput = styled(input)`
  width: 200px;
`;
export const largeInput = styled(input)`
  width: 643px;
`;
