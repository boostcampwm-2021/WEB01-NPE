import React, { FunctionComponent, useState } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";
import * as Molecules from "../../molecules";
import userImg from "./user.png";
import questionImg from "./question.png";

interface Props {
  userName?: string;
  userImage?: string;
}

const Header: FunctionComponent<Props> = ({ userName, userImage }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const onDropdown = () => {
    setIsDropdown((props) => !props);
  };
  const onLoginModal = () => {
    document.body.style.overflow = "hidden";
    setIsLoginModal(true);
  };
  const offLoginModal = () => {
    document.body.style.overflow = "auto";
    setIsLoginModal(false);
  };
  const clickLoginModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <Styled.HeaderDiv>
      <Styled.LogoAnchor href="">
        <Atoms.Logo message="long" />
      </Styled.LogoAnchor>
      <Styled.SearchDiv>
        <Atoms.Input text={"Search..."} size={"medium"} />
      </Styled.SearchDiv>
      <Styled.ButtonDiv>
        {userName ? (
          <div>
            <Molecules.ProfileHeader
              src={userImage!}
              text={userName!}
              onClick={onDropdown}
            />
            {isDropdown && (
              <Styled.DropdownDiv>
                <Molecules.ProfileDropdown />
              </Styled.DropdownDiv>
            )}
          </div>
        ) : (
          <Atoms.Button
            image={userImg}
            text={"로그인"}
            bgColor="#F48024"
            textColor="white"
            onClick={onLoginModal}
          />
        )}
        <Atoms.Button
          image={questionImg}
          text={"질문하기"}
          bgColor="#F48024"
          textColor="white"
          onClick={() => {}}
        />
      </Styled.ButtonDiv>
      {isLoginModal && (
        <Styled.ModalWrapper onClick={offLoginModal}>
          <Styled.Modal onClick={clickLoginModal}>
            <Molecules.LoginModal />
          </Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.HeaderDiv>
  );
};

export default Header;
