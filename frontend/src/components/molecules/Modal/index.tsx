import { Button } from "@src/components/atoms";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import * as Styled from "./styled";
const Modal = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const modalEl = useRef();

  const handleClickOutside = (event) => {
    event.preventDefault();
    const { target } = event;
    if (show && !modalEl!.current!.contains(target)) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const modalContent = show ? (
    <Styled.ModalOverlay>
      <Styled.Modal ref={modalEl}>
        <Styled.ModalHeader>
          <Styled.ModalTitle>Error</Styled.ModalTitle>
          <Styled.ModalClose onClick={handleCloseClick}>X</Styled.ModalClose>
        </Styled.ModalHeader>

        <Styled.ModalBody>{children}</Styled.ModalBody>
        <Styled.ModalFooter>
          <Button type="Header" onClick={handleCloseClick} text="close" />
        </Styled.ModalFooter>
      </Styled.Modal>
    </Styled.ModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
