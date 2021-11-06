import React, { FunctionComponent, useState } from "react";
import * as Styled from "./styled";
import * as Atoms from "../../atoms";
import * as Molecules from "../../molecules";
import userImg from "./user.png";
import questionImg from "./question.png";

interface Props {
  userName?: string;
  userImage?: string;
}

const Header: FunctionComponent<Props> = ({ userName, userImage }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const onDropdown = () => {
    setIsDropdown((props) => !props);
  };
  return (
    <Styled.HeaderDiv>
      <Styled.LogoAnchor href="">
        <Atoms.Logo message="long" />
      </Styled.LogoAnchor>
      <Styled.SearchDiv>
        <Atoms.SearchInput placeholder={"Search..."} width={"643px"} />
      </Styled.SearchDiv>
      <Styled.ButtonDiv>
        {userName ? (
          <div>
            <Molecules.ProfileHeader
              src={userImage!}
              text={userName!}
              onClick={onDropdown}
            />
            {isDropdown ? (
              <Styled.DropdownDiv>
                <Molecules.ProfileDropdown />
              </Styled.DropdownDiv>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Atoms.Button
            image={userImg}
            text={"로그인"}
            bgColor="#F48024"
            textColor="white"
            onClick={() => {}}
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
    </Styled.HeaderDiv>
  );
};

export default Header;
