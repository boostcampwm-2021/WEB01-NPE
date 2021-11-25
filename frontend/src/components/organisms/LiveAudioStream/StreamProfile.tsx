import React, { FunctionComponent } from "react";
import Router from "next/router";
import Image from "next/image";

import { Text } from "@components/atoms";

interface Props {
  name: string;
  profileUrl: string;
}

const StreamProfile: FunctionComponent<Props> = ({ name, profileUrl }) => {
  return (
    <li>
      <div>
        <Image width={48} height={48} src={profileUrl} />
        <Text type="LiveStream" text={`${name}`} />
      </div>
    </li>
  );
};

export default StreamProfile;
