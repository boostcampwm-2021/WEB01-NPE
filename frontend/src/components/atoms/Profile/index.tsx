import React, { FunctionComponent } from "react";
import * as Styled from "./styled";
import Image from "../../atoms/Image";
import { FlattenSimpleInterpolation, css } from "styled-components";

type size_literal = "small" | "medium" | "large";

interface SIZE {
  small: { width: number; height: number };
  medium: { width: number; height: number };
  large: { width: number; height: number };
}

const SIZE_ENUM: SIZE = {
  small: {
    width: 48,
    height: 48,
  },
  medium: {
    width: 68,
    height: 68,
  },
  large: {
    width: 96,
    height: 96,
  },
};

interface Props {
  src: string;
  size: size_literal;
}

const Profile: FunctionComponent<Props> = ({ src, size }) => {
  const { width, height } = SIZE_ENUM[size];
  return (
    <Styled.Profile size={size}>
      <Image src={src} width={width} height={height} />
    </Styled.Profile>
  );
};

export default Profile;
