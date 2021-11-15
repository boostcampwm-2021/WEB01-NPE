import styled from "styled-components";

interface TagProps {
  fontSize: string;
  bgColor: string;
  color: string;
  hoverTextColor: string;
  hoverBgColor: string;
  border: string;
}

export const Tag = styled.a<TagProps>`
  font-size: ${(props) => props.fontSize};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: ${(props) => props.border};
  &:hover {
    background-color: ${(props) => props.hoverBgColor};
    color: ${(props) => props.hoverTextColor};
  }
`;
