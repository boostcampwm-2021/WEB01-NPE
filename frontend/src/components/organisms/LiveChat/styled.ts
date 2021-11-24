import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  // height: 100%;
  overflow-y: auto;
  height: 720px;
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #a8abb7;
  background-color: #384051;
  padding: 8px 12px;
`;

export const UserCount = styled.span`
  margin-left: 5px;
  font-size: 18px;
  color: #808390;
`;

export const Messages = styled.ol`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #2a303d;
  margin: 0;
  padding: 10px 20px;
  overflow-y: auto;
`;

export const Message = styled.li`
  margin-bottom: 10px;
`;

export const UserInformation = styled.div`
  display: flex;
`;
export const UserDetail = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const UserImg = styled.div`
  width: 30px;
  height: 30px;
  & img {
    border-radius: 20px;
  }
`;
export const UserName = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 5px;
  margin-left: 5px;
  font-size: 13px;
  color: #abafba;
  font-weight: 600;
`;

export const ChatDate = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 5px;
  font-size: 12px;
  color: #7c7f8b;
  margin-left: 10px;
  ${(props) => props.isMine && "margin-left: auto;"}
`;

export const ChatContent = styled.div`
  display: inline-block;
  background-color: #384051;
  padding: 10px 8px;
  color: #abafba;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  margin-left: 30px;
`;

export const ChatMyContent = styled.div`
  display: inline-block;
  background-color: #609ae9;
  padding: 10px 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  float: right;
`;

export const InputContainer = styled.form`
  width: 100%;
  height: 80px;
  border-radius: 0px 0px 10px 10px;
`;
export const Input = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  padding: 10px;
  font-size: 14px;
  color: black;
  font-weight: 600;
  &::placeholder {
    color: #b4b5bd;
    font-weight: 600;
  }
  &:focus {
    outline: none;
  }
  border-radius: 0px 0px 10px 10px;
`;

export const Signal = styled.div`
  text-align: center;
  font-size: 12px;
  color: white;
  font-weight: 600;
`;
