import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  height: 35px;
  width: 150px;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  border: 1px solid gray;
`;

export const Button = styled.button`
  box-sizing: border-box;
  display: inline-block;
  width: 50px;
  height: 35px;
  padding: 5px;
  background-color: #53a4de;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

export const TagList = styled.ul`
  position: absolute;
  top: 25px;
  z-index: 10;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 0px 10px;
  background: #fcfcfc;
  border: 1px solid #d7d7d7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const Tag = styled.li`
  width: 100%;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px;
  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  }
`;
