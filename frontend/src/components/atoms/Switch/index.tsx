import React, { FunctionComponent } from "react";
import * as Styled from "./styled";

interface Props {
  type: string;
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
}

interface StyleProps {
  onColor: string;
  offColor: string;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    offColor: "#dddddd",
    onColor: "#6edc5f",
  },
  DarkMode: {
    offColor: "#fb4402",
    onColor: "#1f1e26",
  },
  SideBar: {
    offColor: "#66bb6a",
    onColor: "#ccc",
  },
};

const Switch: FunctionComponent<Props> = ({
  type,
  isChecked,
  setIsChecked,
}) => {
  const styleProps = types[type];
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Styled.Container>
      <Styled.Input
        type="checkbox"
        checked={isChecked}
        onChange={checkHandler}
      />
      <Styled.Slider {...styleProps}>
        <Styled.Ball />
      </Styled.Slider>
    </Styled.Container>
  );
};

export default Switch;
