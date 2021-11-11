import styled from "styled-components";

export const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 100%;
  // height: 50px;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  & h2 {
    margin-right: 5px !important ;
  }
`;
export const QuestionDate = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #586069;
`;
