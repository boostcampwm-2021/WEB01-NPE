import React, { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";
import * as Molecules from "../../molecules";

interface StyleProps {
  visibility: string;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    visibility: "visible",
  },
  Profile: {
    visibility: "hidden",
  },
};

const Header: FunctionComponent<{ type: string }> = ({ type }) => {
  const headerProps: StyleProps = types[type];

  const [session, loading] = useSession();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);

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
  const onPost = (event: React.MouseEvent<HTMLElement>) => {
    if (!session) {
      onLoginButton(event);
      return;
    }
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
      <Link href="/">
        <Styled.LogoAnchor href="/">
          <Atoms.Logo type="Default" />
        </Styled.LogoAnchor>
      </Link>

      <Styled.SearchDiv {...headerProps}>
        <Atoms.Input text={"Search..."} size={"medium"} />
      </Styled.SearchDiv>

      <Styled.ButtonDiv>
        {session?.user && (
          <div>
            <Molecules.ProfileHeader
              src={session.user.image!}
              text={session.user.name!}
              onClick={onProfile}
            />
            {isDropdown && (
              <Styled.DropdownDiv>
                <div onClick={onDropdown}>
                  <Molecules.ProfileDropdown />
                </div>
              </Styled.DropdownDiv>
            )}
          </div>
        )}

        {!session && (
          <Atoms.Button type="Header" text="로그인" onClick={onLoginButton} />
        )}

        <Atoms.Button type={"Header"} text={"질문하기"} onClick={onPost} />
      </Styled.ButtonDiv>
      {isLoginModal && (
        <Styled.ModalWrapper>
          <Styled.Modal onClick={onLoginModal}>
            <Molecules.LoginModal />
          </Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.HeaderDiv>
  );
};

export default Header;
