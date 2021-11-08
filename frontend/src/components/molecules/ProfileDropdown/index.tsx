import React, { FunctionComponent } from "react";
import * as Styled from "./styled";


import Button from "../../atoms/Button";
import userImg from "./user.png";
import logoutImg from "./logout.png";

const ProfileDropDown: FunctionComponent = () => {
  const onClick = () => {};
  return (
    <Styled.Dropdown>
      <Button
        image={userImg}
        text="프로필"
        bgColor="#fff"
        textColor="#000"
        onClick={onClick}
        size="small"
      ></Button>
      <Styled.Line />
      <Button
        image={logoutImg}
        text="로그아웃"
        bgColor="#fff"
        textColor="#000"
        onClick={onClick}
        size="small"
      ></Button>
    </Styled.Dropdown>
  );
};

export default ProfileDropDown;
