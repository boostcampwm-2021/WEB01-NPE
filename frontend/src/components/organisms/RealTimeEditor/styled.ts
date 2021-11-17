import styled from "styled-components";

export const Editor = styled.div`
  display: flex;
  flex-direction: column;
  min-width 500px;
  border: 1px solid;

  .CodeMirror {
    width: 100%;
    min-height: 670px;
  }
`;

export const Tab = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  height: 50px;
  border-bottom: 1px solid;
`;

export const Code = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 0px 20px;
  border-right: 1px solid;
`;
