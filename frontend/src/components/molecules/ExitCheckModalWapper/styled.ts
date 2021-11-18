import styled from "styled-components";

export const ExitCheckModal = styled.div`
  position: absolute;
  z-index: 1500;
  background: white;
  border-radius: 10px;
  border: 1px solid gray;
  top: 50%;
  left: 50%;
  width: 460px;
  height: 200px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ExitCheckModalWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  visibility: hidden;
`;

export const ButtonWapper = styled.div`
  display: flex;
  gap: 10px;
`;
