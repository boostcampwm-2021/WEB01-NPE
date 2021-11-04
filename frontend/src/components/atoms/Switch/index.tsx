import React, { FunctionComponent } from "react";
import { Container, Input, Slider } from "./styled";

interface Props {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  offColor: string;
  onColor: string;
}

const Switch: FunctionComponent<Props> = ({
  isChecked,
  setIsChecked,
  offColor,
  onColor,
}) => {
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Container>
      <Input type="checkbox" onChange={checkHandler} />
      <Slider checked={isChecked} onColor={onColor} offColor={offColor} />
    </Container>
  );
};

export default Switch;