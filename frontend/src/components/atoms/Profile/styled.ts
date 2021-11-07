import styled, { FlattenSimpleInterpolation, css } from "styled-components";

type size_literal = "small" | "medium" | "large";

interface SIZE {
  small: FlattenSimpleInterpolation;
  medium: FlattenSimpleInterpolation;
  large: FlattenSimpleInterpolation;
}

const SIZE_ENUM: SIZE = {
  small: css`
    width: 48px;
    height: 48px;
  `,
  medium: css`
    width: 68px;
    height: 68px;
  `,
  large: css`
    width: 96px;
    height: 96px;
  `,
};

interface Props {
  size: size_literal;
}

export const Profile = styled.div<Props>`
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  ${({ size }) => SIZE_ENUM[size]};
`;
