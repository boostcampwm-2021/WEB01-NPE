import styled, { css, FlattenSimpleInterpolation } from "styled-components";

type size_literal = "small" | "medium" | "large";
interface ButtonProps {
  bgColor: string;
  size: size_literal;
  textColor: string;
}
interface SIZE {
  small: FlattenSimpleInterpolation;
  medium: FlattenSimpleInterpolation;
  large: FlattenSimpleInterpolation;
}

const SIZE_ENUM: SIZE = {
  small: css`
    padding: 10px 15px;
    font-size: 16px;
  `,
  medium: css`
    padding: 12px 20px;
    font-size: 20px;
  `,
  large: css`
    padding: 14px 25px;
    font-size: 24px;
  `,
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  border-radius: 8px;
  border: none;
  ${({ size }) => SIZE_ENUM[size]}
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  transition: box-shadow 0.5s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  img {
    margin-right: 8px;
  }
`;
