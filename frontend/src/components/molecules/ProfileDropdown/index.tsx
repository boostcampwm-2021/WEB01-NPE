import React, { FunctionComponent } from "react";
import Router from "next/router";
import { signOut } from "next-auth/client";
import * as Styled from "./styled";
import Button from "../../atoms/Button";
import userImg from "./user.png";
import logoutImg from "./logout.png";

const ProfileDropDown: FunctionComponent = () => {
  const onProfileButton = () => {
    Router.push("/profile");
  };
  const onLogoutButton = () => {
    signOut();
  };

  return (
    <Styled.Dropdown>
      <Button
        type="Default"
        image={userImg}
        text="프로필"
        onClick={onProfileButton}
      ></Button>
      <Styled.Line />
      <Button
        type="Default"
        image={logoutImg}
        text="로그아웃"
        onClick={onLogoutButton}
      ></Button>
    </Styled.Dropdown>
  );
};

export default ProfileDropDown;
