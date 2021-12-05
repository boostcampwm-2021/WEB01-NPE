import styled from "styled-components";

export const ProfileList = styled.ul`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li + li {
    margin-top: 20px;
  }
`;
