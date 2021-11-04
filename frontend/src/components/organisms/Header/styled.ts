import styled from "styled-components";

export const HeaderDiv = styled.header`
  position: sticky;
  top: 0px;
  z-index: 100;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  background-color: white;
  box-shadow: 0 5px 15px -10px rgba(0, 0, 0, 0.3);
`;

export const LogoAnchor = styled.a``;

export const SearchDiv = styled.div`
  flex-grow: 1;
  min-width: 250px;
  display: flex;
  justify-content: center;
  width: 643px;
  margin-top: 16px;
  padding: 0px 30px;
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
