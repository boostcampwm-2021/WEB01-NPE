import styled from "styled-components";

export const Container = styled.aside`
  width: 200px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-top: 4px;
  padding: 10px;
`;

export const UlTags = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-right: 15px;
  & > h2 {
    font-size: 15px;
  }
`;
