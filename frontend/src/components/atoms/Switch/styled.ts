import styled from "styled-components";
interface SliderProps {
  checked: boolean;
  offColor: string;
  onColor: string;
}
const Container = styled.label`
  display: block;
  height: 34px;
  position: relative;
  width: 60px;
`;

const Input = styled.input`
  display: none;
`;

const Slider = styled.div<SliderProps>`
  background-color: ${(props) =>
    props.checked ? props.offColor : props.onColor};
  bottom: 0;
  cursor: pointer;
  border-radius: 34px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
  &:before {
    background-color: var(--white-primary);
    bottom: 4px;
    content: "";
    height: 26px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
    border-radius: 50%;
    transform: ${(props) => props.checked && "translateX(26px)"};
  }
  background-color: ;
`;

export { Container, Input, Slider };
