import styled from "styled-components";
interface SliderProps {
  offColor: string;
  onColor: string;
}
export const Container = styled.label`
  display: block;
`;

export const Input = styled.input`
  opacity: 0;
  position: absolute;
`;

export const Slider = styled.div<SliderProps>`
  background-color: ${(props) => props.offColor};
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 26px;
  width: 50px;
  transform: scale(1.5);
  transition: background-color 0.4s ease-in-out;
  ${Input}:checked + & {
    background-color: ${(props) => props.onColor};
  }
`;

export const Ball = styled.div`
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 22px;
  width: 22px;
  transform: translateX(0px);
  transition: transform 0.4s ease-in-out;
  ${Input}:checked + ${Slider} & {
    transform: translateX(24px);
  }
`;
