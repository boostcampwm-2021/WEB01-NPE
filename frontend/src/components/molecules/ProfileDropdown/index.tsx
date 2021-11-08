import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
import Button from "../../atoms/Button";
import userImg from "./user.png";
import logoutImg from "./logout.png";

interface Props {
  onProfile: VoidFunction;
  onLogout: VoidFunction;
}

const ProfileDropDown: FunctionComponent<Props> = ({ onProfile, onLogout }) => {
  return (
    <Styled.Dropdown>
      <Button
        type="Default"
        image={userImg}
        text="프로필"
        onClick={onProfile}
      ></Button>
      <Styled.Line />
      <Button
        type="Default"
        image={logoutImg}
        text="로그아웃"
        onClick={onLogout}
      ></Button>
    </Styled.Dropdown>
  );
};

export default ProfileDropDown;
