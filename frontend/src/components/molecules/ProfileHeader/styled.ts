import styled from "styled-components";

export const Anchor = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 0px 8px 0px 8px;
  width: 144px;
  height: 36px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const ImageDiv = styled.div`
  display: flex;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  overflow: hidden;
`;

export const TextDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 96px;
  height: 24px;
`;
