import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 200px;
  height: 100%;
`;

export const ProfileContainer = styled.div`
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
