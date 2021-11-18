import styled from "styled-components";

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
  min-width: 1280px;
  min-height: 720px;
  background: white;
  overflow: auto;
`;

export const temp = styled.div`
  display: flex;
  justify-content: space-between;
`;
