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

  .remote-caret {
    position: absolute;
    border-left: black;
    border-left-style: solid;
    border-left-width: 2px;
    height: 1em;
  }
  .remote-caret > div {
    position: relative;
    top: -0.4em;
    font-size: 13px;
    background-color: rgb(250, 129, 0);
    font-family: serif;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    user-select: none;
    color: white;
    padding-left: 2px;
    padding-right: 2px;
    z-index: 3;
    border-radius: 10px;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  width: 500px;
  background-color: rgba(0, 0, 0, 0.1);
  height: 40px;
  border-bottom: 1px solid;
  overflow-x: scroll;
  white-space: nowrap;
`;

export const Tab = styled.div<{ focused: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 0px 20px;
  border-right: 1px solid;
  ${(props) => props.focused && "background-color: rgba(0, 0, 0, 0.2);"}

  :hover {
    cursor: pointer;
  }
`;

export const closeTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.3);
  margin-left: 20px;
`;
