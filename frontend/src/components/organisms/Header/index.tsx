import React, {
  FunctionComponent,
  useState,
  useEffect,
  createRef,
} from "react";
import { useSession } from "next-auth/client";
import Router from "next/router";

import * as Styled from "./styled";
import { Logo, Input, Button } from "@components/atoms";
import {
  ProfileHeader,
  ProfileDropdown,
  LoginModal,
} from "@components/molecules";

interface Props {
  type: string;
  setTexts: (value: string) => void;
}

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

const Header: FunctionComponent<Props> = ({ type, setTexts }) => {
  const headerProps: StyleProps = types[type];

  const [session, loading] = useSession();
  const [isDropdown, setIsDropdown] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const searchText = createRef<HTMLInputElement>();

  const onProfile = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsDropdown((props) => !props);
  };
  const onDropdown = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };
  const onLoginButton = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    Router.push("/WritePage");
  };

  const onReset = () => {
    setIsDropdown(false);
    setIsLoginModal(false);
    document.body.style.overflow = "auto";
  };

  const submitSearch = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setTexts(searchText!.current!.value);
  };

  useEffect(() => {
    document.body.addEventListener("click", onReset);

    return () => {
      document.body.removeEventListener("click", onReset);
    };
  }, []);

  return (
    <Styled.HeaderDiv>
      <Styled.LogoAnchor href="/">
        <Logo type="Default" />
      </Styled.LogoAnchor>

      <Styled.SearchForm {...headerProps} onSubmit={submitSearch}>
        <Input text={"Search..."} size={"medium"} ref={searchText} />
      </Styled.SearchForm>

      <Styled.ButtonDiv>
        {session?.user && (
          <div>
            <ProfileHeader
              src={session.user.image!}
              text={session.user.name!}
              onClick={onProfile}
            />
            {isDropdown && (
              <Styled.DropdownDiv>
                <div onClick={onDropdown}>
                  <ProfileDropdown />
                </div>
              </Styled.DropdownDiv>
            )}
          </div>
        )}
        {!session && (
          <Button type="Header" text="로그인" onClick={onLoginButton} />
        )}

        <Button type={"Header"} text={"질문하기"} onClick={onPost} />
      </Styled.ButtonDiv>
      {isLoginModal && (
        <Styled.ModalWrapper>
          <Styled.Modal onClick={onLoginModal}>
            <LoginModal />
          </Styled.Modal>
        </Styled.ModalWrapper>
      )}
    </Styled.HeaderDiv>
  );
};

export default Header;
