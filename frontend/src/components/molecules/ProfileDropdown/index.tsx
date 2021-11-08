import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import * as Atoms from "../../atoms";

import userImg from "./user.png";
import logoutImg from "./logout.png";

const ProfileDropDown: FunctionComponent = () => {
  const onClick = () => {};
  return (
    <Styled.Dropdown>
      <Atoms.Button
        image={userImg}
        text="프로필"
        bgColor="#fff"
        textColor="#000"
        onClick={onClick}
        size="small"
      ></Atoms.Button>
      <Styled.Line />
      <Atoms.Button
        image={logoutImg}
        text="로그아웃"
        bgColor="#fff"
        textColor="#000"
        onClick={onClick}
        size="small"
      ></Atoms.Button>
    </Styled.Dropdown>
  );
};

export default ProfileDropDown;
