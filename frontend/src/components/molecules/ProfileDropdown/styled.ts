import styled from "styled-components";

export const Dropdown = styled.div`
  padding: 15px;
  width: 200px;
  height: 129px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  button:hover {
    box-shadow: none;
  }
`;

export const Line = styled.div`
  border-bottom: 1px solid #c4c4c4;
  width: 150px;
`;
