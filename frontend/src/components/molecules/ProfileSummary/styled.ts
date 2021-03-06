import styled from "styled-components";

export const Anchor = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 10px 8px 10px 8px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const ImageDiv = styled.div`
  display: flex;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  overflow: hidden;
`;

export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  & > span {
    width: 95px;
  }
`;
