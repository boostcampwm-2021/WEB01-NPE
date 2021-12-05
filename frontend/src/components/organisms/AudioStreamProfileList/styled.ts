import styled from "styled-components";

export const ProfileList = styled.ul`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 25px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  li + li {
    margin-top: 20px;
  }
`;
