import styled from "styled-components";

export const Container = styled.aside`
  align-self: start;
  position: sticky;
  top: 120px;
  z-index: 10;
  width: 220px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-top: 4px;
  min-height: 250px;
  padding: 20px 10px 10px 10px;
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
  padding: 0px 10px;
  & > h2 {
    font-size: 15px;
  }
`;
