import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

export const TitleContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
`;

export const TagContainer = styled.div`
  margin-bottom: 20px;
`;
export const LiveContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  & > h2 {
    margin: 0;
    margin-right: 20px;
    margin-bottom: 5px;
    font-weight: normal;
  }
`;
export const SubmitContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;
