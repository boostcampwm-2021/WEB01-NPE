import React, { FunctionComponent } from "react";
import Image from "next/image";

interface Props {
  type: string;
  src: string;
  alt?: string;
}

interface StyleProps {
  width: number;
  height: number;
}

const types: { [key: string]: StyleProps } = {
  Default: {
    width: 24,
    height: 24,
  },
  Large: {
    width: 48,
    height: 48,
  },
  Profile: {
    width: 192,
    height: 192,
  },
};

const image: FunctionComponent<Props> = ({ type, src, alt }) => {
  const StyleProps = types[type];
  return (
    <Image
      src={src}
      {...StyleProps}
      alt={alt || "Profile image"}
      objectFit={"contain"}
    />
  );
};

export default image;
