import styled from "styled-components";

export const QuestionDetailContainer = styled.section`
  margin-bottom: 50px;
  margin-top: 20px;
  border: 1px solid #e1e4e8;
  border-radius: 5px;
`;

export const QuestionHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #e1e4e8;
  background-color: #f6f8fa;
`;

export const QuestionHeaderInfo = styled.div`
  font-size: 14px;
  color: hsl(210deg 8% 45%);
`;

export const RealTimeRequest = styled.div`
  float: right;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  min-height: 100px;
  padding: 100px;
  border-radius: 16px;
  background: white;
  overflow: auto;
`;

export const SubButton = styled.span`
  cursor: pointer;
`;
