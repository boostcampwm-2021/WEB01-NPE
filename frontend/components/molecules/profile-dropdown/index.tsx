import { FunctionComponent } from "react";
import { StyledDropdown, StyledLine } from "./styled";

import Button from "../../atoms/Button";
import userImg from "./user.png";
import logoutImg from "./logout.png";

const ProfileDropDown: FunctionComponent = () => {
  const onClick = () => {};
  return (
    <StyledDropdown>
      <Button
        image={userImg}
        text="프로필"
        bgColor="#fff"
        textColor="#000"
        onClick={onClick}
      ></Button>
      <StyledLine />
      <Button
        image={logoutImg}
        text="로그아웃"
        bgColor="#fff"
        textColor="#000"
        onClick={onClick}
      ></Button>
    </StyledDropdown>
  );
};

export default ProfileDropDown;
