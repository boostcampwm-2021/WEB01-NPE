import styled from "styled-components";

interface SearchProps {
  visibility: string;
}

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

export const SearchForm = styled.form<SearchProps>`
  flex-grow: 1;
  min-width: 250px;
  display: flex;
  visibility: ${(props) => props.visibility};
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

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const Modal = styled.div`
  position: absolute;
  top: 25%;
  left: 40%;
`;
