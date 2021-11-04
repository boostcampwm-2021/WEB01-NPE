import styled from "styled-components";

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
`;

export const LogoAnchor = styled.a``;

export const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 643px;
  margin-top: 16px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justsify-content: space-between;

  button,
  div > div {
    margin: 4px;
  }
`;

export const DropdownDiv = styled.div`
  position: absolute;
`;
