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
        type="Default"
        image={userImg}
        text="프로필"
        onClick={onClick}
      ></Button>
      <Styled.Line />
      <Button
        type="Default"
        image={logoutImg}
        text="로그아웃"
        onClick={onClick}
      ></Button>
    </Styled.Dropdown>
  );
};

export default ProfileDropDown;
