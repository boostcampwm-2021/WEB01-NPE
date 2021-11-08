import React, { FunctionComponent, useState, useEffect } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";
import * as Molecules from "../../molecules";
import userImg from "./user.png";
import questionImg from "./question.png";

const Header: FunctionComponent = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [user, setUser] = useState({ name: "", image: "" });

  const onProfile = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsDropdown((props) => !props);
  };
  const onDropdown = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const onLoginButton = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsLoginModal(true);
    document.body.style.overflow = "hidden";
  };
  const onLoginModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const login = () => {
    const name = "hwangwoojin";
    const image = "https://avatars.githubusercontent.com/u/50866506?v=4";
    setUser({ name, image });
    onReset();
  };
  const logout = () => {
    setUser({ name: "", image: "" });
    onReset();
  };

  const onReset = () => {
    setIsDropdown(false);
    setIsLoginModal(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    document.body.addEventListener("click", onReset);

    return () => {
      document.body.removeEventListener("click", onReset);
    };
  }, []);

  return (
    <Styled.HeaderDiv>
      <Styled.LogoAnchor href="">
        <Atoms.Logo message="long" />
      </Styled.LogoAnchor>
      <Styled.SearchDiv>
        <Atoms.Input text={"Search..."} size={"medium"} />
      </Styled.SearchDiv>
      <Styled.ButtonDiv>
        {user.name !== "" ? (
          <div>
            <Molecules.ProfileHeader
              src={user.image}
              text={user.name}
              onClick={onProfile}
            />
            {isDropdown && (
              <Styled.DropdownDiv>
                <div onClick={onDropdown}>
                  <Molecules.ProfileDropdown
                    onProfile={() => {}}
                    onLogout={logout}
                  />
                </div>
              </Styled.DropdownDiv>
            )}
          </div>
        ) : (
          <Atoms.Button
            image={userImg}
            text={"로그인"}
            bgColor="#F48024"
            textColor="white"
            onClick={onLoginButton}
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
        <Styled.ModalWrapper>
          <Styled.Modal onClick={onLoginModal}>
            <Molecules.LoginModal onClick={login} />
          </Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.HeaderDiv>
  );
};

export default Header;
