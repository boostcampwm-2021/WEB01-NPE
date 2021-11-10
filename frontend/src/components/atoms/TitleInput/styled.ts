import styled from "styled-components";

export const Input = styled.input`
  margin: 10px;
  padding: 5px;
  border: none;
  font-size: 48px;
  font-weight: 300;
  border-radius: 2px;
  margin: 0;
  border: none;
  width: 80%;
  background: rgba(0, 0, 0, 0);
  transition: padding-top 0.2s ease, margin-top 0.2s ease;
  overflow-x: hidden;
  &:focus {
    outline: 0;
    padding-top: 35px;
  }
`;

export const Label = styled.label`
  ${Input} + & {
    display: block;
    position: relative;
    white-space: nowrap;
    padding: 0;
    margin: 0;
    width: 10%;
    border-top: 1px solid red;
    -webkit-transition: width 0.4s ease;
    transition: width 0.4s ease;
    height: 0px;
  }
  ${Input}:focus + & {
    width: 80%;
  }
  ${Input}:valid + & {
    border-color: green;
  }
`;

export const Span = styled.span`
  font-weight: 300;
  margin: 0;
  position: absolute;
  color: #8f8f8f;
  font-size: 48px;
  top: -66px;
  left: 0px;
  z-index: -1;
  -webkit-transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  transition: top 0.2s ease, font-size 0.2s ease, color 0.2s ease;
  ${Input}:focus + ${Label} > &,
  ${Input}:valid + ${Label} > & {
    top: -100px;
    font-size: 22px;
    color: #333;
  }
`;
