import React, { FunctionComponent } from "react";
import { StyledDropdown, StyledLine } from "./styled";

import Button from "../../atoms/Button";
import userImg from "./user.png";
import logoutImg from "./logout.png";

interface Props {
  onProfile: VoidFunction;
  onLogout: VoidFunction;
}

const ProfileDropDown: FunctionComponent<Props> = ({ onProfile, onLogout }) => {
  return (
    <StyledDropdown>
      <Button
        image={userImg}
        text="프로필"
        bgColor="#fff"
        textColor="#000"
        onClick={onProfile}
      ></Button>
      <StyledLine />
      <Button
        image={logoutImg}
        text="로그아웃"
        bgColor="#fff"
        textColor="#000"
        onClick={onLogout}
      ></Button>
    </StyledDropdown>
  );
};

export default ProfileDropDown;
