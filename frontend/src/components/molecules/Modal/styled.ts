import styled from "styled-components";

export const ModalBody = styled.div`
  padding: 40px 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  background-color: #e21e3c;
  border-radius: 15px 15px 0px 0px;
  padding: 20px 30px;
`;
export const ModalTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

export const Modal = styled.div`
  background: white;
  min-width: 340px;
  border-radius: 15px;
  z-index: 9999;
`;
export const ModalOverlay = styled.div`
  // position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 9999;
`;

export const ModalClose = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  color: white;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #f0f0f0;
`;
